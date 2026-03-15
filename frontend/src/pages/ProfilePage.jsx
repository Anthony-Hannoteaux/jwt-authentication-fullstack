import { useNavigate } from "react-router"
import { useAuth } from "../Context/AuthContext"

export default function ProfilePage() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate("/login", { replace: true })
    }

    return (
        <main>
            <h1>Test ProfilePage</h1>
            <p>Bienvenu {user.username}</p>
            <p>Email : {user.email}</p>
            <button
            type="button"
            onClick={handleLogout}
            >
                Déconnexion
            </button>
        </main>
    )
}