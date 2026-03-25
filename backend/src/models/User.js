import validator from "validator";
import pool from "../db/database.js";

class User {
    #id;
    #username;
    #email;
    #password;
    #created_at;

    constructor(config) {
        this.id = config.id;
        this.username = config.username;
        this.email = config.email;
        this.password = config.password;
        this.created_at = config.created_at;
    }

    // GETTERS
    get id() {
        return this.#id;
    }

    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    get created_at() {
        return this.#created_at;
    }

    // SETTERS
    set id(value) {
        this.#id = value
    }

    set username(value) {
        if (typeof value !== "string") {
            throw new Error("Votre nom d'utilisateur doit obligatoirement être une chaîne de caractère.")
        }
        const trimValue = value.trim()
        if (trimValue.length < 3) {
            throw new Error("Votre nom d'utilisateur doit faire au moins 3 caractères.")
        }
        this.#username = trimValue
    }

    set email(value) {
        const normalized = String(value).trim().toLowerCase()
        if (!validator.isEmail(normalized)) {
            throw new Error("Le format d'email n'est pas valide")
        }
        this.#email = normalized
    }

    set password(value) {
        this.#password = value
    }

    set created_at(value) {
        this.#created_at = value
    }

    // METHOD
    static async findAll() {
        const result = await pool.query(`SELECT id, username, email, created_at 
            FROM users;
            `)
        return result.rows
    }

    static async findById(id) {
        const parsed = Number(id);
        if (!Number.isInteger(parsed) || parsed <= 0) return null

        const result = await pool.query(`SELECT id, username, email, created_at
            FROM users
            WHERE id = $1`, [
            parsed
        ])
        return result.rows[0] ?? null;
    }

    static async findByEmail(email) {
        const normalized = String(email).trim().toLowerCase()
        const result = await pool.query(`SELECT *
            FROM users
            WHERE email = $1`, [
            normalized
        ])
        return result.rows[0] ?? null;
    }

    static async existByUsername(username, excludeId) {
        const parsed = Number(excludeId);
        if (!Number.isInteger(parsed) || parsed <= 0) return false

        // On attend un résultat, qu'importe le contenu
        const result = await pool.query(`SELECT 1
            FROM users
            WHERE LOWER(username) = LOWER($1)
            AND id != $2`, [
            username,
            parsed
        ])
        return result.rowCount > 0;
    }

    static async existByEmail(email, excludeId) {
        const parsed = Number(excludeId);
        if (!Number.isInteger(parsed) || parsed <= 0) return false

        const result = await pool.query(`SELECT 1
            FROM users
            WHERE email = $1
            AND id != $2`, [
            email,
            parsed
        ])
        return result.rowCount > 0;
    }

    // Update username et/ou email
    static async updateUserProfile(fieldsToUpdate, userId) {
        const parsedId = Number(userId);
        if (!Number.isInteger(parsedId) || parsedId <= 0) return false

        // WhiteList (sécurisation des colonnes de notre table)
        const allowedFields = ["username", "email"]

        /**
         * On récupère sous forme de tableau les paires clé/valeur de notre objet
         * @link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
         */ 
        const entries = Object.entries(fieldsToUpdate)
        // On filtre notre objet, permettant de n'autoriser que les colonnes indiquées
        const filteredFields = entries.filter(([key]) => allowedFields.includes(key))
        // On récupère dans un tableau les valeur qui servirons à créer notre tableau de paramètre
        const values = filteredFields.map(([, value]) => value)
        // On y ajoute l'ID de l'utilisateur
        values.push(parsedId)
        
        // On dynamise l'instruction de mise à jour de nos valeurs
        const updatedValues = filteredFields.map(([key], index) => {
            return `"${key}" = $${index + 1}`
        })

        const result = await pool.query(`UPDATE users
                SET ${updatedValues.join(", ")}
                WHERE "id" = $${filteredFields.length + 1}
                RETURNING "id", "username", "email"
            `, values)

        return result.rows[0] ?? null
    }

    async create() {
        const result = await pool.query(`INSERT INTO users
            (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at`, [
            this.#username,
            this.#email,
            this.#password
        ])
        return result.rows[0]
    }

}


export default User;
