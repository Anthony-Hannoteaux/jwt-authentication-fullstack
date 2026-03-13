// Import des composants UI
import Input from "../Components/ui/Input"
import Button from "../Components/ui/Button"
import AuthLayout from "../Components/ui/AuthLayout"
// Import du hook personnalisé
import useForm from "../Hooks/useForm"

export default function LoginPage() {

    const { values, handleChange } = useForm({
        email: "",
        password: ""
    })

    return (
        <>
            <AuthLayout
                title={"Connexion :"}
            >
                <form >
                    <Input
                        label={"Email"}
                        id={"email"}
                        type={"email"}
                        value={values.email}
                        required={true}
                        placeholder={"exemple@email.com"}
                        onChange={handleChange}
                    />
                    <Input
                        label={"Mot de passe"}
                        id={"password"}
                        type={"password"}
                        value={values.password}
                        required={true}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                    >
                        Envoyer
                    </Button>
                </form>
            </AuthLayout>
        </>
    )
}