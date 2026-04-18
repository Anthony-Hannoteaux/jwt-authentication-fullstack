import './style.scss'

import AuthLayout from "../../Components/ui/AuthLayout"
import Input from "../../Components/ui/Input"
import Button from "../../Components/ui/Button"

import { useAuth } from "../../Context/AuthContext"
import { useState } from "react"
import { Link } from "react-router-dom"

import useForm from "../../Hooks/useForm"

export default function SettingsPage() {

    const { user, updateUserProfile } = useAuth()

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const { values, handleChange } = useForm({
        "username": user.username,
        "email": user.email
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        setSuccessMsg('')
        const { username, email } = values
        const normalizedEmail = email.trim().toLowerCase()

        // Vérification validité des champs
        if (!username || username.trim() === "") {
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

        try {
            const data = await updateUserProfile({
                username: username,
                email: normalizedEmail
            })
            setSuccessMsg(data.message)

        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    return (
        <AuthLayout
            title="Mes Informations Personnels"
        >
            {successMsg && <p className="success-msg">{successMsg}</p>}
            {errorMsg && <p className="error-msg" >{errorMsg}</p>}
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
                <div className='update__btn__wrapper'>
                    <Button
                        type="submit"
                    >
                        Enregistrer
                    </Button>
                </div>
            </form>
            <div className="password__link__wrapper">
                <span>Besoin de changer votre mot de passe ?</span> <Link to={"/settings/password"}>Modifier mon mot de passe</Link>
            </div>
        </AuthLayout>
    )
}