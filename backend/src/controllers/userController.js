import User from "../models/User.js";

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const result = await User.findAll();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur" })
        }
    },

    getUserById: async (req, res) => {
        try {
            const id = req.params.id
            const result = await User.findById(id)

            if (!result) return res.status(404).json({ message: "Utilisateur introuvable" })

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur" })
        }
    },

    getUserByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            const result = await User.findByEmail(email)
            if (!result) {
                return res.status(404).json({ message: 'Aucune correspondance pour cette Email' })
            }
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: 'Erreur serveur' })
        }
    },

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

    updateProfileUser: async (req, res) => {
        try {
            const userId = req.auth.userId
            const user = await User.findById(userId)
            if (!user) {
                return res.status(400).json({ message: "Aucun utilisateur correspondant à cette identifiant." })
            }
            const { username, email } = req.body
            const normalizedUsername = username.trim()
            const normalizedEmail = email.trim().toLowerCase()

            // Objet contenant les paires clés/valeurs à modofier
            const fieldsToUpdate = {}

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
            console.log(fieldsToUpdate)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Erreur serveur' })
        }
    }
}

export default userController;