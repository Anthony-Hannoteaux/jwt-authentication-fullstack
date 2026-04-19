import "./style.scss"
import { useNavigate, useLocation, Link } from "react-router-dom"
// Import des composants de gestions des métadonnées
import PageMeta from "../../Components/meta/PageMeta"
// Import des composants UI
import Input from "../../Components/ui/Input"
import Button from "../../Components/ui/Button"
import AuthLayout from "../../Components/ui/AuthLayout"
// Import du hook personnalisé
import useForm from "../../Hooks/useForm"
// Import du contexte d'authentification
import { useAuth } from "../../Context/AuthContext"

import { useState, useEffect } from "react"

export default function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    const { values, handleChange } = useForm({
        email: "",
        password: ""
    })

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    // On affecte la valeur du state de navigation récupéré après le succès de l'inscription
    useEffect(() => {
        if (location.state?.successMsg) {
            setSuccessMsg(location.state.successMsg)
            navigate(location.pathname, { replace: true, state: "" })
        }

    }, [location, navigate])


    // Gestion des données lors de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        setSuccessMsg('')

        const { email, password } = values
        const trimmedPassword = password.trim()

        // VERIFICATIONS FRONT
        // Vérification que la valeur de l'email ne soit pas une chaîne de caractère vide après nettoyage
        if (!email) {
            setErrorMsg("L'adresse Email est obligatoire.")
            document.getElementById("email")?.focus()
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
            document.getElementById("email")?.focus()
            return
        }

        // Vérification que la valeur de mot de passe ne soit pas une chaîne de caractère vide après nettoyage
        if (!trimmedPassword) {
            setErrorMsg("Le mot de passe est obligatoire.")
            document.getElementById("password")?.focus()
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
        <>
            <PageMeta
                title="JWT Authentication App - Connexion"
                description="Connectez vous et accédez à votre profil de façon sécurisée."
            />
            <AuthLayout
                title={"Connexion"}
            >
                {successMsg && <p className="success-msg" role="status">{successMsg}</p>}
                {errorMsg && <p className="error-msg" role="alert">{errorMsg}</p>}
                <form onSubmit={handleSubmit} noValidate>
                    <Input
                        label={"Email"}
                        id={"email"}
                        type={"email"}
                        value={values.email}
                        required={false}
                        placeholder={"exemple@email.com"}
                        onChange={handleChange}
                        autoComplete={"email"}
                        />
                    <Input
                        label={"Mot de passe"}
                        id={"password"}
                        type={"password"}
                        value={values.password}
                        required={false}
                        autoComplete={"current-password"}
                        onChange={handleChange}
                        />
                    <div className="login__btn__wrapper">
                        <Button
                            type="submit"
                        >
                            Me connecter
                        </Button>
                    </div>
                </form>
                <div className="register__link__wrapper">
                    <span>Pas encore de compte ?</span> <Link to={"/register"}>Créer un compte</Link>
                </div>
            </AuthLayout>
        </>
    )
}