import Input from "../Components/ui/Input"

export default function LoginPage() {
    return (
        <>
            <h1>Test Login Page</h1>
            <Input
                label={"Email"}
                id={"email"}
                type={"email"}
                required={true}
                placeholder={"exemple@email.com"}
                onChange={() => null}
            />
        </>
    )
}