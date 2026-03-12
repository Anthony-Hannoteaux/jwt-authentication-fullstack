export default function Input() {
    return (
        <div className="input-group">
            <label htmlFor="test">
                Test Label
            </label>
            <input
            type="text"
            id="test"
            name="test"
            required
            placeholder="Test..."
            onChange={() => null}
            />
        </div>
    )
}