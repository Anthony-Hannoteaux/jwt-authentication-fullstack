import "./style.scss"

import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { registerUser } from "../../api/authApi"

import PageMeta from "../../Components/meta/PageMeta"
import AuthLayout from "../../Components/ui/AuthLayout"
import Input from "../../Components/ui/Input"
import Button from "../../Components/ui/Button"

import useForm from "../../Hooks/useForm"

export default function RegisterPage() {
    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState("")

    const { values, handleChange } = useForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg("")
        const { username, email, password, confirmPassword } = values
        const normalizedUsername = username.trim()
        const normalizedEmail = email.trim().toLowerCase()

        // VERIFICATION FRONT
        if (!normalizedUsername) {
            setErrorMsg("Le nom d'utilisateur est obligatoire.")
            document.getElementById("username")?.focus()
            return
        }

        if (!normalizedEmail) {
            setErrorMsg("L'adresse email est obligatoire.")
            document.getElementById("email")?.focus()
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            setErrorMsg("L'adresse Email est invalide.")
            document.getElementById("email")?.focus()
            return
        }

        if (!password) {
            setErrorMsg("Le mot de passe est obligatoire.")
            document.getElementById("password")?.focus()
            return
        }

        if (!confirmPassword) {
            setErrorMsg("La confirmation du mot de passe est obligatoire.")
            document.getElementById("confirmPassword")?.focus()
            return
        }

        if (password !== confirmPassword) {
            setErrorMsg("Les mots de passe saisis ne sont pas identiques.")
            document.getElementById("confirmPassword")?.focus()
            return
        }

        try {
            const data = await registerUser({
                username: normalizedUsername,
                email: normalizedEmail,
                password: password
            })
            /**
             * En cas de succès on souhaite afficher le message qui le confirme
             * On le ferra donc transiter lors de la redirection vers la page /login
             * @link https://reactrouter.com/api/hooks/useNavigate#navigate-with-a-to-object
             */
            navigate("/login", {
                replace: true,
                state: { successMsg: data.message }
            })

        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    return (
        <>
            <PageMeta
                title="JWT Authentication App - Inscription"
                description="Créez votre compte sécurisé et accédez à votre profil."
            />
            <AuthLayout
                title={"Inscription"}
            >
                {errorMsg && <p className="error-msg" role="alert">{errorMsg}</p>}
                {/* On désactive la validation native du navigateur pour ce formulaire
            étant donné qu'on gère de façon manuelle nos vérifications front */}
                <form onSubmit={handleSubmit} noValidate>
                    <Input
                        label={"Nom d'utilisateur"}
                        id={"username"}
                        type={"text"}
                        value={values.username}
                        required={false}
                        placeholder={"Username12"}
                        autoComplete={"username"}
                        onChange={handleChange}
                    />
                    <Input
                        label={"Email"}
                        id={"email"}
                        type={"email"}
                        value={values.email}
                        required={false}
                        placeholder={"exemple@email.com"}
                        autoComplete={"email"}
                        onChange={handleChange}
                    />
                    <Input
                        label={"Mot de passe"}
                        id={"password"}
                        type={"password"}
                        value={values.password}
                        required={false}
                        placeholder={""}
                        autoComplete={"new-password"}
                        onChange={handleChange}
                        />
                    <Input
                        label={"Confirmation du mot de passe"}
                        id={"confirmPassword"}
                        type={"password"}
                        value={values.confirmPassword}
                        required={false}
                        placeholder={""}
                        autoComplete={"new-password"}
                        onChange={handleChange}
                    />
                    <div className="register__btn__wrapper">
                        <Button
                            type="submit"
                        >
                            M'inscrire
                        </Button>
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}