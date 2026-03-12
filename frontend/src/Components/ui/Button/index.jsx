/**
 * Composant UI modulaire d'un bouton
 * @param {Object} props 
 * @param {string} props.type
 * @param {React.ReactNode} props.children
 */
export default function Button({ type, children }) {
    return (
        <button
        className="button"
        type={type}
        >
            {children}
        </button>
    )
}