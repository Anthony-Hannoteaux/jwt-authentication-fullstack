import AuthLayout from "../Components/ui/AuthLayout"
import Input from "../Components/ui/Input"
import Button from "../Components/ui/Button"

import useForm from "../Hooks/useForm"
import { useState } from "react"

export default function RegisterPage() {

    const [errorMsg, setErrorMsg] = useState("")

    const { values, handleChange } = useForm({
        username: "",
        email: "",
        password: "",
        confirmed_password: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorMsg("")
        const { username, email, password, confirmed_password } = values
        const trimmedEmail = email.trim()

        // VERIFICATION FRONT
        if (!username) {
            setErrorMsg("Le nom d'utilisateur est obligatoire.")
            return
        }

        if (!trimmedEmail) {
            setErrorMsg("L'adresse email est obligatoire.")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setErrorMsg("L'adresse Email est invalide.")
            return
        }

        if (!password) {
            setErrorMsg("Le mot de passe est obligatoire.")
            return
        }

        if (!confirmed_password) {
            setErrorMsg("La confirmation du mot de passe est obligatoire.")
            return
        }

        if (password !== confirmed_password) {
            setErrorMsg("Les mots de passe saisis ne sont pas identiques.")
            return
        }

        console.log("username :", username)
        console.log("email :", email)
        console.log("password :", password)
        console.log("confirmed_password :", confirmed_password)
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
                    id={"confirmed_password"}
                    type={"password"}
                    value={values.confirmed_password}
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