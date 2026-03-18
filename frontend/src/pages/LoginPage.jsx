import { useNavigate, useLocation } from "react-router-dom"
// Import des composants UI
import Input from "../Components/ui/Input"
import Button from "../Components/ui/Button"
import AuthLayout from "../Components/ui/AuthLayout"
// Import du hook personnalisé
import useForm from "../Hooks/useForm"
// Import du contexte d'authentification
import { useAuth } from "../Context/AuthContext"

import { useState } from "react"

export default function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    const { values, handleChange } = useForm({
        email: "",
        password: ""
    })

    // On affecte la valeur du state de navigation récupéré après le succès de l'inscription
    const successMsg = location.state?.successMsg || null
    const [errorMsg, setErrorMsg] = useState('')

    // Gestion des données lors de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')

        const { email, password } = values
        const trimmedPassword = password.trim()

        // VERIFICATIONS FRONT
        // Vérification que la valeur de l'email ne soit pas une chaîne de caractère vide après nettoyage
        if (!email) {
            setErrorMsg("L'adresse Email est obligatoire.")
            return
        }

        /**
         * Regex pour vérification permettant de vérifier si :
         * - Au moins 1 caractère avant "@"
         * - Contient un "@"
         * - Au moins 1 caractère après "@"
         * - Un point
         * - Pas d'espace
         */
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Vérification de la validité de l'adresse email
        // @link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
        if (!emailRegex.test(email)) {
            setErrorMsg("Adresse Email invalide.")
            return
        }

        // Vérification que la valeur de mot de passe ne soit pas une chaîne de caractère vide après nettoyage
        if (!trimmedPassword) {
            setErrorMsg("Le mot de passe est obligatoire.")
            return
        }

        // APPEL API BACKEND
        try {
            await login({
                email: email,
                password: trimmedPassword
            })

            navigate("/profile", { replace: true })

        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    return (
        <AuthLayout
            title={"Connexion :"}
        >
            {successMsg && <p>{successMsg}</p>}
            {errorMsg && <p>{errorMsg}</p>}
            <form onSubmit={handleSubmit} noValidate>
                <Input
                    label={"Email"}
                    id={"email"}
                    type={"email"}
                    value={values.email}
                    required={false}
                    placeholder={"exemple@email.com"}
                    onChange={handleChange}
                />
                <Input
                    label={"Mot de passe"}
                    id={"password"}
                    type={"password"}
                    value={values.password}
                    required={false}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                >
                    Envoyer
                </Button>
            </form>
        </AuthLayout>
    )
}