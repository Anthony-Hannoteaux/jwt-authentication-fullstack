import AuthLayout from "../Components/ui/AuthLayout"
import Input from "../Components/ui/Input"
import Button from "../Components/ui/Button"

import useForm from "../Hooks/useForm"

export default function RegisterPage() {

    const { values, handleChange } = useForm({
        username: "",
        email: "",
        password: "",
        confirmed_password: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    } 

    return (
        <AuthLayout
            title={"Inscription"}
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label={"Veuillez indiquer votre nom d'utilisateur"}
                    id={"username"}
                    type={"username"}
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