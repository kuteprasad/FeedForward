import React from "react";
import { Label } from "./Label";

export const FileInput = ({
  name,
  label,
  accept = "image/jpeg,image/png",
  required = false,
  error,
  onChange,
  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}
      <input
        id={name}
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        required={required}
        className="w-full"
      />
      {error && (
        <p className="mt-1 text-sm text-[var(--error-color)]">{error}</p>
      )}
    </div>
  );
};
