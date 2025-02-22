import { Switch } from "@headlessui/react";

export const Toggle = ({
  checked,
  onChange,
  labelLeft,
  labelRight,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {labelLeft && (
        <span
          className={`text-sm ${checked ? "text-gray-500" : "text-gray-900"}`}
        >
          {labelLeft}
        </span>
      )}

      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`${
          checked ? "bg-[var(--primaryButton-bg)]" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primaryButton-bg)] focus:ring-offset-2 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span className="sr-only">Toggle</span>
        <span
          className={`${
            checked ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>

      {labelRight && (
        <span
          className={`text-sm ${!checked ? "text-gray-500" : "text-gray-900"}`}
        >
          {labelRight}
        </span>
      )}
    </div>
  );
};
