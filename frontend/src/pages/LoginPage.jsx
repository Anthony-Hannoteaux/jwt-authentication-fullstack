// Import des composants UI
import Input from "../Components/ui/Input"
import Button from "../Components/ui/Button"
import AuthLayout from "../Components/ui/AuthLayout"
// Import du hook personnalisé
import useForm from "../Hooks/useForm"
// Import du contexte d'authentification
import { useAuth } from "../Context/AuthContext"
// Import des méthodes API
import loginUser from "../api/authApi"
import { useState } from "react"

export default function LoginPage() {

    const { setUser, setAccessToken, user, isAuthenticated } = useAuth()

    const { values, handleChange } = useForm({
        email: "",
        password: ""
    })

    const [errorMsg, setErrorMsg] = useState('')

    // Gestion des données lors de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')

        const { email, password } = values
        const trimmedEmail = email.trim()
        const trimmedPassword = password.trim()
        
        // VERIFICATIONS FRONT
        // Vérification que la valeur de l'email ne soit pas une chaîne de caractère vide après nettoyage
        if (!trimmedEmail) {
            setErrorMsg("L'adresse Email est obligatoire.")
            return
        }
        
        // Vérification que la valeur de mot de passe ne soit pas une chaîne de caractère vide après nettoyage
        if (!trimmedPassword) {
            setErrorMsg("Le mot de passe est obligatoire.")
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
        if (!emailRegex.test(trimmedEmail)) {
            setErrorMsg("Adresse Email invalide.")
            return
        }

        // APPEL API BACKEND
        try {
            const data = await loginUser({
            email: trimmedEmail,
            password: trimmedPassword
        })

        /**
         * On met à jour les variables d'états de notre contexte d'authentification
         * Avec les valeurs récupéré depuis le backend
         */
        setAccessToken(data.accessToken)
        setUser(data.user)

        console.log("Connexion OK : ", data)
        
    } catch (error) {
        setErrorMsg(error.message)
        }
    }

    return (
        <>
            <AuthLayout
                title={"Connexion :"}
            >
                {/* Test permettant de vérifier si les données on bien été récupéré depuis le backend */}
                {isAuthenticated && <p>Utilisateur connecté : {user.username}</p>}
                {errorMsg && <p>{errorMsg}</p>}
                <form onSubmit={handleSubmit}>
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
        </>
    )
}