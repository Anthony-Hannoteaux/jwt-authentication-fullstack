import './style.scss'

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
        if (
            currentPassword === undefined || currentPassword.trim() === "" ||
            newPassword === undefined || newPassword.trim() === "" ||
            confirmPassword === undefined || confirmPassword.trim() === ""
        ) {
            setErrorMsg('Tous les champs sont obligatoires')
            return
        }

        if (newPassword !== confirmPassword) {
            setErrorMsg("Les mots de passe saisis ne sont pas identiques.")
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
        <AuthLayout
            title="Modifier Mon Mot De Passe"
        >
            {successMsg && <p className="success-msg">{successMsg}</p>}
            {errorMsg && <p className="error-msg" >{errorMsg}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    label={"Votre mot de passe actuel"}
                    id={"currentPassword"}
                    type={"password"}
                    value={values.currentPassword}
                    required={false}
                    onChange={handleChange}
                />
                <Input
                    label={"Nouveau mot de passe"}
                    id={"newPassword"}
                    type={"password"}
                    value={values.newPassword}
                    required={false}
                    onChange={handleChange}
                />
                <Input
                    label={"Confirmation de mot de passe"}
                    id={"confirmPassword"}
                    type={"password"}
                    value={values.confirmPassword}
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
        </AuthLayout>
    )
}