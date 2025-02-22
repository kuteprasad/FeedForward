import { Button } from "../basic/Button";
import { FormComponent } from "../basic/FormComponent";
import { FormInput } from "../basic/FormInput";
import Navbar from "../layout/Navbar";
import { useLogin } from "./loginHook";

export default function Login() {
	const { t, formData, setFormData, handleSubmit } = useLogin();

	return (
		<>
			<Navbar />
			<div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
				<FormComponent
					onSubmit={handleSubmit}
					className="w-full max-w-md mx-auto"
				>
					<h2 className="text-2xl font-bold mb-6 text-center text-[var(--text)]">
						{t("login")}
					</h2>
					<div className="space-y-4">
						<FormInput
							type="email"
							placeholder={t("email")}
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							className="w-full p-2 rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] focus:border-[var(--input-focus)] focus:outline-none"
						/>
						<FormInput
							type="password"
							placeholder={t("password")}
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							className="w-full p-2 rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] focus:border-[var(--input-focus)] focus:outline-none"
						/>
						<Button
							type="submit"
							className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] p-2 rounded-lg hover:bg-[var(--btn-primary-hover)]"
						>
							{t("login")}
						</Button>
					</div>
				</FormComponent>
			</div>
		</>
	);
}
