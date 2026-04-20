import "./style.scss"

import PageMeta from "../../Components/meta/PageMeta"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
    return (
        <>
            <PageMeta
                title="JWT Authentication App - Erreur 404"
                description="La page demandée est introuvable. Retournez à l'accueil de l'application."
            />
            <main className="main not-found" >
                <section className="not-found__container">
                    <h1 className="title">Erreur 404</h1>
                    <p>La page que vous recherchez n'existe pas.</p>
                    <Link
                        to={"/"}
                    >
                        Retour à l'accueil
                    </Link>
                </section>
            </main>
        </>
    )
}