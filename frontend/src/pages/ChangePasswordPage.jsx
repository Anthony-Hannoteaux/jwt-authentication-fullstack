import AuthLayout from "../Components/ui/AuthLayout"
import Input from "../Components/ui/Input"
import Button from "../Components/ui/Button"

import useForm from "../Hooks/useForm"

export default function ChangePasswordPage() {

    const { values, handleChange } = useForm({
        "currentPassword": "",
        "newPassword": "",
        "confirmPassword": ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    }

    return (
        <AuthLayout
            title="Modifier Mon Mot De Passe"
        >
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
                <Button
                    type="submit"
                >
                    Enregistrer
                </Button>
            </form>
        </AuthLayout>
    )
}