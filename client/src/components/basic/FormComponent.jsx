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
        px-4 py-4
        sm:px-6 sm:py-6 
        md:px-8 md:py-8 
        lg:px-10 lg:py-10
        rounded-lg 
        shadow-md hover:shadow-lg 
        transition-shadow duration-300 
        bg-[var(--background)]
        border border-[var(--border)]
        space-y-4
        ${className}
      `}
		>
			{children}
		</form>
	);
};
