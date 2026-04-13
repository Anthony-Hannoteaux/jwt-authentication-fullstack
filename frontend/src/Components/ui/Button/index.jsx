
/**
 * Composant UI modulaire d'un bouton
 * @param {Object} props 
 * @param {"button" | "submit" | "reset"} props.type
 * @param {React.ReactNode} props.children
 */
export default function Button({ type = "button", children }) {
    return (
        <button
        className="button"
        type={type}
        >
            {children}
        </button>
    )
}