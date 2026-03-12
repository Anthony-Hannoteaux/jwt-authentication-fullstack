/**
 * Layout générique des formulaires de soumission (Connexion/Inscription)
 * @param {Object} props
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 */
export default function AuthLayout({ title, children }) {
    return (
        <main className="main">
            <section className="section">
                <h1 className="main-title">
                    {title}
                </h1>
                {children}
            </section>
        </main>
    )
}