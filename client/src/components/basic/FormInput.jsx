export const FormInput = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  maxLength,
  disabled,
}) => (
  <div className="mb-4">
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-md border 
            bg-[var(--bg-color)] 
            text-[var(--text-color)]
            border-[var(--border-color)]
            focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]
            placeholder-[var(--placeholder-color)]
            transition-colors duration-200
            ${
              error
                ? "border-[var(--error-color)] focus:ring-[var(--error-color)]"
                : ""
            }`}
    />
    {error && <p className="mt-1 text-sm text-[var(--error-color)]">{error}</p>}
  </div>
);
