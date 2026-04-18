import "./style.scss";

import Button from "../../Components/ui/Button"

import { useNavigate, Link } from "react-router"
import { useAuth } from "../../Context/AuthContext"

export default function ProfilePage() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate("/login", { replace: true })
    }

    return (
        <main className="main profile">
            <div className="profile__container">
                <h1 className="title">Mon Profil</h1>
                <p className="sub-info">Adresse mail : <span className="email">{user.email}</span></p>
                <p className="welcome__txt">Bienvenue sur votre page de profil <span className="user__name">{user.username}</span></p>
                <div className="profile__actions">
                    <Link
                        to={"/settings"}
                    >
                        Modifier mes informations
                    </Link>
                    <Button
                        type="button"
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </Button>
                </div>
            </div>
        </main>
    )
}