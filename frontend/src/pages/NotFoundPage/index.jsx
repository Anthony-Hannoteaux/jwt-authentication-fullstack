import "./style.scss"

import { Link } from "react-router-dom"

export default function NotFoundPage() {
    return (
        <main className="main not-found" >
            <div className="not-found__container">
                <h1 className="title">Erreur 404</h1>
                <p>La page que vous recherchez n'existe pas.</p>
                <Link
                to={"/"}
                >
                    Retour à l'accueil
                </Link>
            </div>
        </main>
    )
}