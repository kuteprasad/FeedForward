export const FormComponent = ({
  onSubmit,
  children,
  className = "",
  size = "medium",
}) => {
  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    full: "w-full",
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`
                w-full 
                ${sizeClasses[size]}
                mx-auto 
                p-4 sm:p-6 md:p-8
                rounded-lg 
                shadow-md hover:shadow-lg
                transition-shadow duration-300
                bg-[var(--bg-secondary-color)]
                border border-[var(--border-color)]
                space-y-4
                ${className}
            `}
    >
      {children}
    </form>
  );
};
