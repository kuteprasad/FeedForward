export const SelectInput = ({
  name,
  options,
  value,
  onChange,
  required = false,
  className = "",
  placeholder,
}) => (
  <div className="mb-4">
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-2 rounded-md border
            bg-[var(--bg-color)]
            text-[var(--text-color)]
            border-[var(--border-color)]
            focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]
            transition-colors duration-200 ${className}`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
