import './style.scss'

import PageMeta from "../../Components/meta/PageMeta"
import AuthLayout from "../../Components/ui/AuthLayout"
import Input from "../../Components/ui/Input"
import Button from "../../Components/ui/Button"

import useForm from "../../Hooks/useForm"
import { useAuth } from "../../Context/AuthContext"
import { useState } from "react"

export default function ChangePasswordPage() {

    const { updateUserPassword } = useAuth()

    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const { values, handleChange } = useForm({
        "currentPassword": "",
        "newPassword": "",
        "confirmPassword": ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        setSuccessMsg('')

        const { currentPassword, newPassword, confirmPassword } = values

        if (currentPassword === undefined || currentPassword.trim() === "") {
            setErrorMsg('Le mot de passe actuel est obligatoire')
            document.getElementById('currentPassword')?.focus()
            return
        }

        if (newPassword === undefined || newPassword.trim() === "") {
            setErrorMsg('Le nouveau mot de passe est obligatoire')
            document.getElementById('newPassword')?.focus()
            return
        }

        if (confirmPassword === undefined || confirmPassword.trim() === "") {
            setErrorMsg('La confirmation du mot de passe est obligatoire')
            document.getElementById('confirmPassword')?.focus()
            return
        }

        if (newPassword !== confirmPassword) {
            setErrorMsg("Les mots de passe saisis ne sont pas identiques.")
            document.getElementById('confirmPassword')?.focus()
            return
        }
        try {
            const data = await updateUserPassword(values)
            setSuccessMsg(data.message)
        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    return (
        <>
            <PageMeta
                title="JWT Authentication App - Modifier mon mot de passe"
                description="Modifiez votre mot de passe de façon sécurisée."
            />
            <AuthLayout
                title="Modifier mon mot de passe"
            >
                {successMsg && <p className="success-msg" role='status'>{successMsg}</p>}
                {errorMsg && <p className="error-msg" role='alert'>{errorMsg}</p>}
                <form onSubmit={handleSubmit} noValidate>
                    <Input
                        label={"Votre mot de passe actuel"}
                        id={"currentPassword"}
                        type={"password"}
                        value={values.currentPassword}
                        required={false}
                        autoComplete={"current-password"}
                        onChange={handleChange}
                    />
                    <Input
                        label={"Nouveau mot de passe"}
                        id={"newPassword"}
                        type={"password"}
                        value={values.newPassword}
                        required={false}
                        autoComplete={"new-password"}
                        onChange={handleChange}
                    />
                    <Input
                        label={"Confirmation du nouveau mot de passe"}
                        id={"confirmPassword"}
                        type={"password"}
                        value={values.confirmPassword}
                        required={false}
                        autoComplete={"new-password"}
                        onChange={handleChange}
                    />
                    <div className='update__btn__wrapper'>
                        <Button
                            type="submit"
                        >
                            Modifier mon mot de passe
                        </Button>
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}