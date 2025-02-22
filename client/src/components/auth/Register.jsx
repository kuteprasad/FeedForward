import { useRegister } from "./registerHook";

import { FormComponent } from "../basic/FormComponent";
import { FormInput } from "../basic/FormInput";
import { Button } from "../basic/Button";

export default function Register() {
	const { formData, handleSubmit, handleChange } = useRegister();

	return (
		<>
	
			<div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
				<FormComponent
					onSubmit={handleSubmit}
					className="w-full max-w-md p-8 rounded-lg shadow-md bg-[var(--input-bg)] border border-[var(--border)]"
				>
					<h2 className="text-2xl font-bold mb-6 text-center text-[var(--text)]">
						Register
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
							type="text"
							name="username"
							placeholder="Username"
							value={formData.username}
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
							className="w-full 
							bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] p-2 rounded-lg hover:bg-[var(--btn-primary-hover)]"
							variant="primary"
						>
							Register
						</Button>
					</div>
				</FormComponent>
			</div>
		</>
	);
}
