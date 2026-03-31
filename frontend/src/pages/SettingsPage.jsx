import AuthLayout from "../Components/ui/AuthLayout"
import Input from "../Components/ui/Input"
import Button from "../Components/ui/Button"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

import useForm from "../Hooks/useForm"

export default function SettingsPage() {

    const { user, updateUserProfile } = useAuth()
    const [userMsg, setUserMsg] = useState('')

    const { values, handleChange } = useForm({
        "username": user.username,
        "email": user.email
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUserMsg("")
        const { username, email } = values
        const normalizedEmail = email.trim().toLowerCase()
        
        // Vérification validité des champs
        if (!username || username.trim() === "") {
            setUserMsg("Le nom d'utilisateur est obligatoire.")
            return
        }

        if (!normalizedEmail) {
            setUserMsg("L'adresse email est obligatoire.")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            setUserMsg("L'adresse Email est invalide.")
            return
        }

        try {
            const data = await updateUserProfile({
            username: username,
            email: normalizedEmail
        })
        setUserMsg(data.message)

    } catch (error) {
            setUserMsg(error.message)
        }
    }

    return (
        <AuthLayout
            title="Mes Informations Personnels"
        >
            {userMsg && <p>{userMsg}</p>}
            <form onSubmit={handleSubmit} noValidate>
                <Input
                    label={"Nom d'utilisateur"}
                    id={"username"}
                    type={"text"}
                    value={values.username}
                    required={false}
                    onChange={handleChange}
                />
                <Input
                    label={"Adresse Email"}
                    id={"email"}
                    type={"email"}
                    value={values.email}
                    required={false}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                >
                    Enregistrer
                </Button>
            </form>
            <div>
                {
                    // Accessibilité \\
                    /* <p>Lien vers la modification du mot de passe</p> */
                }
                <Link
                    to={"/settings/password"}
                >
                    Modifier votre mot de passe
                </Link>
            </div>
        </AuthLayout>
    )
}