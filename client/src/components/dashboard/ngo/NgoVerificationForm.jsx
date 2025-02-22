import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const NgoVerificationForm = ({ onClose }) => {
	const [image, setImage] = useState(null);
	const [registrationNumber, setRegistrationNumber] = useState("");
	const [message, setMessage] = useState("");

	const { user } = useSelector((store) => store.auth);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		const ngoId = user?.id;

		formData.append("ngoId", ngoId);
		formData.append("image", image);
		formData.append("registrationNumber", registrationNumber);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/applyForVerification`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);

			setMessage(response.data.message);

			if (response.data.success) {
				alert("Verification request submitted successfully!");
				setImage(null);
				setRegistrationNumber("");
				setMessage("");

				// Close the form if onClose function is provided
				if (onClose) {
					onClose();
				}
			}
		} catch (error) {
			setMessage("Failed to submit verification request.");
		}
	};

	return (
		<div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-4">NGO Verification Request</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block mb-2">Upload Certificate:</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="border p-2 w-full"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2">Registration Number:</label>
					<input
						type="text"
						value={registrationNumber}
						onChange={(e) => setRegistrationNumber(e.target.value)}
						className="border p-2 w-full"
						required
					/>
				</div>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded-lg"
				>
					Submit Request
				</button>
			</form>
			{message && <p className="mt-4 text-center">{message}</p>}
		</div>
	);
};

export default NgoVerificationForm;
