import pool from "../db/database.js";

class Session {
    #id;
    #user_id;
    #refresh_token_hash;
    #created_at;
    #expires_at;
    #revoked_at;

    constructor(config) {
        this.id = config.id;
        this.user_id = config.user_id;
        this.refresh_token_hash = config.refresh_token_hash;
        this.created_at = config.created_at;
        this.expires_at = config.expires_at;
        this.revoked_at = config.revoked_at;
    }

    // GETTERS
    get id() {
        return this.#id
    }

    get user_id() {
        return this.#user_id
    }

    get refresh_token_hash() {
        return this.#refresh_token_hash
    }

    get created_at() {
        return this.#created_at
    }

    get expires_at() {
        return this.#expires_at
    }

    get revoked_at() {
        return this.#revoked_at
    }

    // SETTERS
    set id(value) {
        this.#id = value ?? null
    }

    set user_id(value) {
        const parsed = Number(value)
        if (!Number(parsed) || parsed <= 0) {
            throw new Error("Identifiant utilisateur invalide.")
        }
        this.#user_id = parsed
    }

    set refresh_token_hash(value) {
        if (typeof value !== "string" || value.trim().length < 20) {
            throw new Error("Refresh Token invalide.")
        }
        this.#refresh_token_hash = value.trim()
    }

    set created_at(value) {
        this.#created_at = value ?? null
    }

    set expires_at(value) {
        if (!value) throw new Error ("Date d'expiration obligatoire pour la session.")
        this.#expires_at = value
    }

    set revoked_at(value) {
        this.#revoked_at = value ?? null
    }

    // METHOD
    static async findValidByRefreshToken(refreshTokenHash) {
        if (typeof refreshTokenHash !== "string" || refreshTokenHash.trim() === "") {
            return null
        }

        const result = await pool.query(`SELECT id, user_id, expires_at
            FROM sessions
            WHERE refresh_token_hash = $1
                AND revoked_at IS NULL
                AND expires_at > NOW()
            LIMIT 1
            `, [
                refreshTokenHash.trim()
            ])

            return result.rows[0] ?? null
    }

    static async revokedById(sessionId) {
        const parsed = Number(sessionId)
        if (!Number.isInteger(parsed) || parsed <= 0) {
            return false
        }

        const result = await pool.query(`UPDATE sessions
            SET revoked_at = NOW()
            WHERE id = $1
                AND revoked_at IS NULL
            `, [
                parsed
            ])
        
        return result.rowCount === 1
    }

    async create() {
        const result = await pool.query(`INSERT INTO sessions (user_id, refresh_token_hash, expires_at)
            VALUES ($1, $2, $3)
            RETURNING id, user_id, refresh_token_hash, created_at, expires_at, revoked_at
            `, [
                this.#user_id, this.#refresh_token_hash, this.#expires_at
            ])
        
        return result.rows[0]
    }
}

export default Session;