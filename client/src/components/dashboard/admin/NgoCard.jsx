import React, { useState } from "react";

const NgoCard = ({ ngo, viewProfile, handleVerifyNgo }) => {
	const [selectedImage, setSelectedImage] = useState(null);

	const openImage = (imageUrl) => setSelectedImage(imageUrl);
	const closeImage = () => setSelectedImage(null);

	return (
		<div className="p-3 bg-white border border-gray-300 rounded-md shadow-sm flex flex-col gap-3 text-sm">
			{/* Upper Section */}
			<div className="flex flex-wrap items-center gap-3">
				{/* Placeholder for Photo */}
				<div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
					Photo
				</div>

				{/* Details Section */}
				<div className="flex-1 min-w-0">
					<h2 className="text-base font-semibold text-gray-800 truncate">
						{ngo.username}
					</h2>
					<p className="text-gray-600 truncate">Email: {ngo.email}</p>
					<p className="text-gray-600 truncate">Mobile: {ngo.mobileNo}</p>
					<p className="text-gray-600 truncate">Address: {ngo.address}</p>
				</div>
			</div>

			{/* Certificate Section */}
			{ngo.certificate && (
				<div className="my-2">
					<img
						src={ngo.certificate}
						alt="Certificate"
						className="w-24 h-16 object-cover cursor-pointer border border-gray-300 rounded-md"
						onClick={() => openImage(ngo.certificate)}
					/>
				</div>
			)}

			{/* Action Buttons */}
			<div className="">
				<button
					onClick={viewProfile}
					className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex-1 text-xs mr-3"
				>
					View
				</button>
				<button
					onClick={() => handleVerifyNgo(ngo._id, ngo.username, true)}
					className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 flex-1 text-xs mr-3"
				>
					Accept
				</button>
				<button
					onClick={() => handleVerifyNgo(ngo._id, ngo.username, false)}
					className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 flex-1 text-xs mr-3"
				>
					Decline
				</button>
			</div>

			{/* Modal for Enlarged Image */}
			{selectedImage && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
					<div className="relative">
						<img
							src={selectedImage}
							alt="Enlarged Certificate"
							className="max-w-full max-h-screen rounded-md"
						/>
						<button
							onClick={closeImage}
							className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default NgoCard;
