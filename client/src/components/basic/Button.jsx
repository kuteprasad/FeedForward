export const Button = ({
	variant = "primary",
	isLoading = false,
	children,
	type = "button",
	disabled,
	className = "",
	...props
}) => {
	const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";

	const variants = {
		primary: `bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] 
    disabled:bg-[var(--disabled-bg-color)] disabled:text-[var(--disabled-text-color)] 
    disabled:cursor-not-allowed disabled:opacity-60`,
		secondary: `bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] hover:bg-[var(--btn-secondary-hover)] 
    disabled:bg-[var(--disabled-bg-color)] disabled:text-[var(--disabled-text-color)]`,
		outline: `bg-[var(--btn-outline-bg)] text-[var(--btn-outline-text)] hover:bg-[var(--btn-outline-hover)] 
    disabled:bg-[var(--disabled-bg-color)] disabled:text-[var(--disabled-text-color)] 
    disabled:cursor-not-allowed disabled:opacity-60`,
	};

	return (
		<button
			type={type}
			disabled={isLoading || disabled}
			className={`${baseStyles} ${variants[variant]} ${className}`}
			{...props}
		>
			{isLoading ? (
				<span className="flex items-center justify-center gap-2">
					<svg
						className="animate-spin h-4 w-4"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
							fill="none"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					Loading...
				</span>
			) : (
				children
			)}
		</button>
	);
};
