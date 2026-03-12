import Input from "../Components/ui/Input"
import Button from "../Components/ui/Button"
import AuthLayout from "../Components/ui/AuthLayout"

export default function LoginPage() {
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
                        required={true}
                        placeholder={"exemple@email.com"}
                        onChange={() => null}
                    />
                    <Input
                        label={"Mot de passe"}
                        id={"password"}
                        type={"password"}
                        required={true}
                        onChange={() => null}
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