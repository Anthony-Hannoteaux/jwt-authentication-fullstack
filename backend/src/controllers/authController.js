import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import validator from "validator";

import User from "../models/User.js";
import Session from "../models/Session.js";

// TOKEN'S Time To Live Limits
const ACCESS_TOKEN_TTL = "15m"
const REFRESH_TOKEN_TTL_DAYS = 7

// Generate refresh and refreshToken Hash
function generateRefreshToken() {
    return crypto.randomBytes(64).toString('hex');
}

function hashRefreshToken(refreshToken) {
    return crypto.createHash('sha256').update(refreshToken).digest('hex')
}

const authController = {
    // Login Request
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            // Request validation (400)
            if (typeof email !== "string" || typeof password !== "string") {
                return res.status(400).json({ message: "Email et mot de passe requis." })
            }
            const normalizedEmail = email.trim().toLowerCase()
            if (!validator.isEmail(normalizedEmail)) {
                return res.status(400).json({ message: "Format d'email invalide." })
            }
            if (password.length < 1) {
                return res.status(400).json({ message: "Mot de passe requis." })
            }

            // Check payload with DB
            const user = await User.findByEmail(normalizedEmail)
            if (!user) {
                return res.status(401).json({ message: "Couple identifiant/mot de passe invalide." })
            }
            const passwordChecked = await bcrypt.compare(password, user.password);
            if (!passwordChecked) {
                return res.status(401).json({ message: "Couple identifiant/mot de passe invalide." })
            }

            // Initial access token
            const accessToken = jwt.sign(
                { sub: user.id },
                process.env.JWT_SECRET,
                { expiresIn: ACCESS_TOKEN_TTL }
            )

            // Initial refresh token + hash
            const refreshToken = generateRefreshToken()
            const refreshTokenHash = hashRefreshToken(refreshToken)

            // expires_at calculation
            const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000)

            // Initial new session
            const session = new Session({
                user_id: user.id,
                refresh_token_hash: refreshTokenHash,
                expires_at: expiresAt
            })

            // Create a new session line in DB
            await session.create()

            // Initial cookie with access token
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
            })

            return res.status(200).json({
                accessToken,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Erreur serveur" })
        }
    },

    // Refresh Request
    refresh: async (req, res) => {
        try {
            const refreshToken = req.cookies?.refresh_token
            if (!refreshToken) {
                return res.status(401).json({ message: "Non autorisé" })
            }
            const refreshHash = hashRefreshToken(refreshToken)

            const session = await Session.findValidByRefreshToken(refreshHash)
            if (!session) {
                return res.status(401).json({ message: "Non autorisé" })
            }

            const user = await User.findById(session.user_id)
            if (!user) {
                return res.status(401).json({ message: "Non autorisé" })
            }

            const accessToken = jwt.sign(
                { sub: user.id },
                process.env.JWT_SECRET,
                { expiresIn: ACCESS_TOKEN_TTL }
            )

            return res.status(200).json({ accessToken })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Erreur serveur" })
        }
    },

    // Logout request
    logout: async (req, res) => {
        try {
            const refreshToken = req.cookies?.refresh_token
            if (!refreshToken) {
                res.clearCookie("refresh_token", {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                })
                return res.status(200).json({ message: "Session Fermée" })
            }

            const refreshHash = hashRefreshToken(refreshToken)
            const session = await Session.findByRefreshToken(refreshHash)
            if (session && !session.revoked_at) {
                await Session.revokedById(session.id)
            }

            res.clearCookie("refresh_token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            })
            return res.status(200).json({ message: "Session Fermée" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erreur serveur" })
        }
    },

    // Register request
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body

            if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string") {
                return res.status(400).json({ message: "Les valeurs attendues doivent être des chaînes de caractères valides." })
            }

            const normalizedUsername = username.trim()
            const normalizedEmail = email.trim().toLowerCase()

            if (normalizedUsername === "") {
                return res.status(400).json({ message: "Nom d'utilisateur requis." })
            }

            if (!validator.isEmail(normalizedEmail)) {
                return res.status(400).json({ message: "Format d'email invalide." })
            }

            if (password.trim() === "") {
                return res.status(400).json({ message: "Mot de passe requis." })
            }

            if (password.startsWith(" ") || password.endsWith(" ")) {
                return res.status(400).json({ message: "Le mot de passe ne doit ni commencer, ni finir par un espace." })
            }

            if (!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
                return res.status(400).json({ message: "Le mot de passe doit comprendre au minimum 8 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 symbole." })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const userCheckedByEmail = await User.findByEmail(normalizedEmail)
            if (userCheckedByEmail !== null) {
                return res.status(409).json({ message: "Adresse email déjà enregistrée." })
            }

            const payload = {
                username: normalizedUsername,
                email: normalizedEmail,
                password: hashedPassword
            }
            const newUser = new User(payload)
            await newUser.create()

            return res.status(201).json({ message: "Inscription réalisée avec succès." })
        } catch (error) {
            console.error(error.message)
            return res.status(500).json({ message: "Erreur serveur" })
        }
    }
}

export default authController;