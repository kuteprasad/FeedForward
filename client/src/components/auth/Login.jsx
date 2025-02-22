import { useLogin } from "./loginHook";

import { FormComponent } from "../basic/FormComponent";
import { FormInput } from "../basic/FormInput";
import { Button } from "../basic/Button";

export default function Login() {
	const { formData, handleSubmit, handleChange } = useLogin();

	return (
		<>
		
			<div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-8">
				<FormComponent
					onSubmit={handleSubmit}
					className="w-full max-w-md mx-auto p-8 rounded-lg shadow-lg bg-[var(--input-bg)] border border-[var(--border)]"
				>
					<h2 className="text-2xl font-bold mb-6 text-center text-[var(--text)]">
						Login
					</h2>
					<div className="space-y-4">
						<FormInput
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							className="w-full p-2 rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] focus:border-[var(--input-focus)] focus:outline-none"
						/>
						<FormInput
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							className="w-full p-2 rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] focus:border-[var(--input-focus)] focus:outline-none"
						/>
						<Button
							type="submit"
							className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] p-2 rounded-lg hover:bg-[var(--btn-primary-hover)] transition-colors"
						>
							Login
						</Button>
					</div>
				</FormComponent>
			</div>
		</>
	);
}
