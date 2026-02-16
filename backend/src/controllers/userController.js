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
    }
}

export default userController;