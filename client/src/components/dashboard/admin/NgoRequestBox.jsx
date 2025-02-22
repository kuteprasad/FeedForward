import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NgoCard from "./NgoCard";

const NgoRequestBox = () => {
	const [ngos, setNgos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetchNonVerifiedNgos();
	}, []);

	const fetchNonVerifiedNgos = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/auth/nonVerifiedNgos`
			);
			setNgos(response.data.ngos);
		} catch (error) {
			console.error("Error fetching NGOs:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyNgo = async (ngoId, ngoUsername, isVerified) => {
		const confirmAction = window.confirm(
			`Are you sure you want to ${
				isVerified ? "approve" : "reject"
			} ${ngoUsername}?`
		);
		if (!confirmAction) return;

		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/auth/verifyNgo`, {
				ngoId,
				isVerifiedNgo: isVerified,
			});
			fetchNonVerifiedNgos();
			alert(
				`NGO ${ngoUsername} has been ${isVerified ? "approved" : "rejected"}.`
			);
		} catch (error) {
			console.error("Error updating NGO verification:", error);
		}
	};

	const openImage = (imageUrl) => setSelectedImage(imageUrl);
	const closeImage = () => setSelectedImage(null);

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<h1 className="text-3xl font-bold mb-6 text-center">Non-Verified NGOs</h1>

			{loading ? (
				<p className="text-center text-gray-600">Loading NGOs...</p>
			) : ngos.length === 0 ? (
				<p className="text-center text-gray-600">No non-verified NGOs found.</p>
			) : (
				<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
					{ngos.map((ngo) => (
						<NgoCard
							key={ngo._id}
							ngo={ngo}
							viewProfile={() => navigate(`/profile/${id}`)}
							handleVerifyNgo={handleVerifyNgo}
							openImage={openImage}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default NgoRequestBox;
