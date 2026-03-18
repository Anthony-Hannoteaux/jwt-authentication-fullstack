import AuthLayout from "../Components/ui/AuthLayout"
import Input from "../Components/ui/Input"
import Button from "../Components/ui/Button"

import { registerUser } from "../api/authApi"

import useForm from "../Hooks/useForm"

import { useNavigate } from "react-router-dom"
import { useState } from "react"

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
        const normalizedEmail = email.trim().toLowerCase()

        // VERIFICATION FRONT
        if (!username) {
            setErrorMsg("Le nom d'utilisateur est obligatoire.")
            return
        }

        if (!normalizedEmail) {
            setErrorMsg("L'adresse email est obligatoire.")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            setErrorMsg("L'adresse Email est invalide.")
            return
        }

        if (!password) {
            setErrorMsg("Le mot de passe est obligatoire.")
            return
        }

        if (!confirmPassword) {
            setErrorMsg("La confirmation du mot de passe est obligatoire.")
            return
        }

        if (password !== confirmPassword) {
            setErrorMsg("Les mots de passe saisis ne sont pas identiques.")
            return
        }

        try {
            const data = await registerUser({
                username: username,
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
                state : {successMsg: data.message}
            })

        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    return (
        <AuthLayout
            title={"Inscription"}
        >
            {errorMsg && <p>{errorMsg}</p>}
            {/* On désactive la validation native du navigateur pour ce formulaire
            étant donné qu'on gère de façon manuelle nos vérifications front */}
            <form onSubmit={handleSubmit} noValidate>
                <Input
                    label={"Veuillez indiquer votre nom d'utilisateur"}
                    id={"username"}
                    type={"text"}
                    value={values.username}
                    required={false}
                    placeholder={"anon12"}
                    onChange={handleChange}
                />
                <Input
                    label={"Veuillez indiquer une adresse email valide"}
                    id={"email"}
                    type={"email"}
                    value={values.email}
                    required={false}
                    placeholder={"exemple@email.com"}
                    onChange={handleChange}
                />
                <Input
                    label={"Veuillez indiquer votre mot de passe."}
                    id={"password"}
                    type={"password"}
                    value={values.password}
                    required={false}
                    placeholder={""}
                    onChange={handleChange}
                />
                <Input
                    label={"Veuillez confirmer votre mot de passe."}
                    id={"confirmPassword"}
                    type={"password"}
                    value={values.confirmPassword}
                    required={false}
                    placeholder={""}
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