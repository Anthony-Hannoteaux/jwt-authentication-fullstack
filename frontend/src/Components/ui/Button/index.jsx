
/**
 * Composant UI modulaire d'un bouton
 * @param {Object} props 
 * @param {"button" | "submit" | "reset"} props.type
 * @param {React.ReactNode} props.children
 */
export default function Button({ type = "button", children, className, ...props }) {
    return (
        <button
        className={className}
        type={type}
        {...props}
        >
            {children}
        </button>
    )
}