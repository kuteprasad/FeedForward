import { useState } from "react";
import NgoVerificationForm from "./NgoVerificationForm";

export default function NgoDashboard() {
	const [showForm, setShowForm] = useState(false);

	return (
		<div className="p-6">
			<button
				onClick={() => setShowForm(true)}
				className="px-4 py-2 bg-blue-500 text-white rounded-lg"
			>
				Apply for Verification
			</button>

			{showForm && (
				<div className="mt-6">
					<NgoVerificationForm onClose={() => setShowForm(false)} />
				</div>
			)}
		</div>
	);
}
