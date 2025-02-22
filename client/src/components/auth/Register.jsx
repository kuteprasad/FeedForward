import { useRegister } from "./registerHook";
import { FormComponent } from "../basic/FormComponent";
import { FormInput } from "../basic/FormInput";
import { Button } from "../basic/Button";
import Navbar from "../layout/Navbar";

export default function Register() {
	const { t, formData, setFormData, handleSubmit } = useRegister();

	return (
		<div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
			<Navbar />
			<FormComponent
				onSubmit={handleSubmit}
				className="w-full max-w-md"
			>
				<h2 className="text-2xl font-bold mb-6 text-center text-[var(--text)]">
					{t("register")}
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
						type="text"
						placeholder={t("username")}
						value={formData.username}
						onChange={(e) =>
							setFormData({ ...formData, username: e.target.value })
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
						variant="primary"
						className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] p-2 rounded-lg hover:bg-[var(--btn-primary-hover)]"
					>
						{t("register")}
					</Button>
				</div>
			</FormComponent>
		</div>
	);
}
