import "./style.scss";

import PageMeta from "../../Components/meta/PageMeta"
import Button from "../../Components/ui/Button"

import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"

export default function ProfilePage() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate("/login", { replace: true })
    }

    return (
        <>
            <PageMeta
                title="JWT Authentication App - Profil utilisateur"
                description="Consultez vos informations utilisateur et modifiez votre profil."
            />
            <main className="main profile">
                <section className="profile__container">
                    <h1 className="title">Mon Profil</h1>
                    <p className="welcome__txt">Bienvenue sur votre espace utilisateur.</p>
                    <div className="profile__infos">
                        <h2 className="infos__title">Mes informations</h2>
                        <dl className="infos__list">
                            <div className="infos__wrapper">
                                <dt>Nom d'utilisateur</dt>
                                <dd>{user.username}</dd>
                            </div>
                            <div className="infos__wrapper">
                                <dt>Adresse email</dt>
                                <dd>{user.email}</dd>
                            </div>
                        </dl>
                    </div>
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
                </section>
            </main>
        </>
    )
}