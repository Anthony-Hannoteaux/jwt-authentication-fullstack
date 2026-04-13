import "./style.scss"

/**
 * Layout générique des formulaires de soumission (Connexion/Inscription)
 * @param {Object} props
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 */
export default function AuthLayout({ title, children }) {
    return (
        <main className="auth-layout">
            <section className="auth-layout-section">
                <h1 className="auth-layout-section-title">
                    {title}
                </h1>
                {children}
            </section>
        </main>
    )
}