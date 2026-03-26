import validator from "validator";
import bcrypt from "bcrypt"
import User from "../models/User.js";

const userController = {
    // Permet de récupérer les informations d'un utilisateur (utilisé pour l'authentification)
    getMe: async (req, res) => {
        try {
            const userId = req.auth.userId;
            const result = await User.findById(userId)
            if (!result) {
                return res.status(404).json({ message: 'Utilisateur introuvable' })
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Erreur serveur' })
        }
    },

    // Permet la modification des données utilisateur (username/email)
    updateProfileUser: async (req, res) => {
        try {
            const userId = req.auth.userId
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ message: "Aucun utilisateur correspondant à cet identifiant." })
            }
            const { username, email } = req.body
            const normalizedUsername = username.trim()
            const normalizedEmail = email.trim().toLowerCase()

            // Objet contenant les paires clés/valeurs à modifier
            const fieldsToUpdate = {}

            // Vérification si username est modifié
            if (normalizedUsername.toLowerCase() !== user.username.toLowerCase()) {
                if (normalizedUsername === "") {
                    return res.status(400).json({ message: "Le champ de modification du nom d'utilisateur ne doit pas être vide." })
                }

                const userAlreadyExist = await User.existByUsername(normalizedUsername, userId)
                if (userAlreadyExist) {
                    return res.status(409).json({ message: "Nom d'utilisateur déjà utilisé." })
                }

                fieldsToUpdate.username = normalizedUsername
            }
            // Vérification si email est modifié
            if (normalizedEmail !== user.email) {
                if (normalizedEmail === "") {
                    return res.status(400).json({ message: "Le champ de modification de l'adresse mail ne doit pas être vide." })
                }

                if (!validator.isEmail(normalizedEmail)) {
                    return res.status(400).json({ message: "L'adresse mail n'est pas valide." })
                }

                const emailAlreadyExist = await User.existByEmail(normalizedEmail, userId)
                if (emailAlreadyExist) {
                    return res.status(409).json({ message: "Adresse mail déjà utilisée." })
                }

                fieldsToUpdate.email = normalizedEmail
            }
            if (Object.keys(fieldsToUpdate).length === 0) {
                return res.status(400).json({ message: "Aucune modification détectée" })
            }

            const result = await User.updateUserProfile(fieldsToUpdate, userId)

            return res.status(200).json({ message: "Modification du mot de passe réalisée avec succès" })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Erreur serveur' })
        }
    },

    // Permet la modification des données utilisateur (mot de passe)
    updateUserPassword: async (req, res) => {
        try {
            const userId = req.auth.userId
            const { currentPassword, newPassword, confirmPassword } = req.body

            // Vérification de la présence et de la validité du mot de passe actuel
            if (currentPassword === undefined) {
                return res.status(400).json({ message: "Veuillez renseigner votre mot de passe actuel" })
            }
            if (typeof currentPassword !== "string" || currentPassword.trim() === "") {
                return res.status(400).json({ message: "Le format du mot de passe actuel est invalide" })
            }

            // Vérification de la présence et de la validité du mot de passe à modifier
            if (newPassword === undefined) {
                return res.status(400).json({ message: "Veuillez renseigner votre nouveau mot de passe" })
            }
            if (typeof newPassword !== "string" || newPassword.trim() === "") {
                return res.status(400).json({ message: "Le format du nouveau mot de passe est invalide" })
            }

            // Vérification de la présence et de la validité du mot de passe (confirmation)
            if (confirmPassword === undefined) {
                return res.status(400).json({ message: "Veuillez confirmer votre nouveau mot de passe" })
            }
            if (typeof confirmPassword !== "string" || confirmPassword.trim() === "") {
                return res.status(400).json({ message: "Le format de la confirmation du mot de passe est invalide" })
            }

            // Comparaison du nouveau mot de passe et de sa confirmation
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: "Les mots de passe que vous avez saisis ne correspondent pas" })
            }

            // Validation du nouveau mot de passe
            if (!validator.isStrongPassword(newPassword, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                return res.status(400).json({ message: "Le nouveau mot de passe doit comprendre au minimum 8 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 symbole." })
            }

            // Récupération de l'utilisateur et de son mot de passe stocké en base de donnée
            const user = await User.findUserPasswordById(userId)
            if (!user) {
                return res.status(404).json({ message: "Aucun utilisateur correspondant à cet identifiant." })
            }

            // Comparaison du mot de passe renseigner avec celui stocké en base de donnée
            const currentPasswordChecked = await bcrypt.compare(currentPassword, user.password)
            if (!currentPasswordChecked) {
                return res.status(400).json({ message: "Mot de passe incorrect." })
            }
            // Comparaison ancien mot de passe avec nouveau
            const newPasswordChecked = await bcrypt.compare(newPassword, user.password)
            if (newPasswordChecked) {
                return res.status(409).json({ message: "Nouveau mot de passe similaire au précédent, veuillez renseigner un nouveau mot de passe pour valider la modification." })
            }

            // Hash du nouveau mot de passe et enregistrement de la modification
            const newPasswordHashed = await bcrypt.hash(newPassword, 10)

            const result = await User.updateUserPassword(newPasswordHashed, userId)
            if (!result) {
                return res.status(500).json({ message: 'Erreur serveur' })
            }

            return res.status(200).json({ message: "Modification du mot de passe réalisée avec succès" })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Erreur serveur' })
        }
    }
}

export default userController;