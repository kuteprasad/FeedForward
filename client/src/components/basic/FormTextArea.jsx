export const FormTextArea = ({
  name,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  maxLength,
  className = "",
}) => (
  <div className="mb-4">
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      style={{
        color: "var(--formInput-text)",
        backgroundColor: "var(--formInput-color)",
        borderColor: "var(--formInput-border)",
      }}
      className={`w-full px-4 py-2 rounded-md border 
                 resize-none 
          bg-[var(--formInput-color)] 
          text-[var(--formInput-text)]
          border-[var(--formInput-border)]
          focus:outline-none focus:ring-2 focus:ring-[var(--primary-bg)]
          placeholder-[var(--placeholder-color)]
          transition-colors duration-200
          ${
            error
              ? "border-[var(--error-color)] focus:ring-[var(--error-color)]"
              : ""
          }
          ${className}`}
    />
    {error && <p className="mt-1 text-sm text-[var(--error-color)]">{error}</p>}
  </div>
);
