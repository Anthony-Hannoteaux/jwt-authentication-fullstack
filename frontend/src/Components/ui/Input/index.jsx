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
export default function Input({ label, id, type, value, required, placeholder, onChange }) {
    return (
        <div className="input-group">
            <label htmlFor={id}>
                {label}
            </label>
            <input
            type={type}
            id={id}
            name={id}
            value={value}
            required={required}
            placeholder={placeholder}
            onChange={onChange}
            />
        </div>
    )
}