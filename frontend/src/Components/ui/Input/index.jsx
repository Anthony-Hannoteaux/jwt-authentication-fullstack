import "./style.scss"

/**
 * Composant UI d'un champ modulable accompagné de son label
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.id
 * @param {string} props.type
 * @param {string} props.value
 * @param {boolean} props.required
 * @param {string} props.placeholder
 * @param {Function} props.onChange
 */
export default function Input({ label, id, type, value, required, placeholder, autoComplete, onChange }) {
    return (
        <div className="input-group">
            <label 
            htmlFor={id}
            className="input-group__label"
            >
                {label}
            </label>
            <input
            className="input-group__input"
            type={type}
            id={id}
            name={id}
            value={value}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onChange}
            />
        </div>
    )
}