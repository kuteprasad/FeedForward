import { XMarkIcon } from "@heroicons/react/24/outline";

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`w-full ${sizeClasses[size]} ${className} bg-white rounded-lg shadow-sm border border-gray-200`}
    >
      {(title || showCloseButton) && (
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          )}

          {showCloseButton && (
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primaryButton-bg)]"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
};
