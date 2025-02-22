import React from "react";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaBuilding,
	FaIdBadge,
	FaMapMarkerAlt,
	FaRoad,
	FaCamera,
} from "react-icons/fa";
import { Button } from "../basic/Button";
import { Label } from "../basic/Label";
import { FormComponent } from "../basic/FormComponent";
import { FormInput } from "../basic/FormInput";
const EditProfile = ({
	formData,
	setFormData, // if needed for custom updates
	handleChange,
	handleUpdate,
	handleLocation,
	onCancel,
}) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50 p-4">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 overflow-y-auto max-h-full">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-3xl font-bold text-gray-800">Edit Profile</h2>
					<Button
						onClick={onCancel}
						className="text-gray-600 text-3xl hover:text-gray-800 leading-none"
					>
						&times;
					</Button>
				</div>
				<FormComponent
					onSubmit={handleUpdate}
					className="space-y-6"
				>
					{/* Personal Information Section */}
					<section className="p-6 bg-gray-50 rounded shadow">
						<h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
							<FaUser /> Personal Information
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
							{/* Profile Photo */}
							<div className="flex flex-col items-center">
								<div className="relative w-24 h-24 mt-2">
									<img
										src={formData.photo || "/default-profile.png"}
										alt="Profile"
										className="w-24 h-24 object-cover rounded-full border border-gray-200"
									/>
								</div>
							</div>
							{/* Personal Details */}
							<div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<Label className="block text-sm font-medium text-gray-700">
										Username
									</Label>
									<FormInput
										type="text"
										name="username"
										value={formData.username || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md p-2"
									/>
								</div>
								<div>
									<Label className="block text-sm font-medium text-gray-700">
										Email
									</Label>
									<FormInput
										type="email"
										name="email"
										value={formData.email || ""}
										onChange={handleChange}
										disabled
										className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
									/>
								</div>
								<div>
									<Label className="block text-sm font-medium text-gray-700">
										Mobile Number
									</Label>
									<FormInput
										type="text"
										name="mobileNo"
										value={formData.mobileNo || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md p-2"
									/>
								</div>
								<div>
									<Label className="block text-sm font-medium text-gray-700">
										Full Name
									</Label>
									<FormInput
										type="text"
										name="fullName"
										value={formData.fullName || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md p-2"
										placeholder="Organization/Donor Name"
									/>
								</div>
							</div>
						</div>
					</section>

					{/* Role-Based Organization Information Section */}
					{(formData.role === "ngo" || formData.role === "donor") && (
						<section className="p-6 bg-gray-50 rounded shadow">
							<h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
								<FaBuilding /> Organization Information
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
								<div>
									<Label className="block text-sm font-medium text-gray-700">
										Type
									</Label>
									<FormInput
										type="text"
										name="orgType"
										value={formData.orgType || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md p-2"
										placeholder="e.g., NGO or Donor"
									/>
								</div>
							</div>
							{formData.role === "ngo" && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
									<div>
										<Label className="block text-sm font-medium text-gray-700">
											Registration Number
										</Label>
										<FormInput
											type="text"
											name="regNo"
											value={formData.regNo || ""}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md p-2"
											placeholder="Registration Number"
										/>
									</div>
									<div>
										<Label className="block text-sm font-medium text-gray-700">
											Motive
										</Label>
										<FormInput
											type="text"
											name="motive"
											value={formData.motive || ""}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md p-2"
											placeholder="Organization Motive"
										/>
									</div>
								</div>
							)}
						</section>
					)}

					{/* Location Information Section */}
					<section className="p-6 bg-gray-50 rounded shadow">
						<h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
							<FaMapMarkerAlt /> Address Information
						</h3>

						<div className="mt-4">
							<Label className="block text-sm font-medium text-gray-700">
								Address
							</Label>
							<FormInput
								type="text"
								name="address"
								value={formData.address || ""}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md p-2"
								placeholder="Street, City, Country"
							/>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
							<div>
								<Label className="block text-sm font-medium text-gray-700">
									Latitude
								</Label>
								<FormInput
									type="number"
									name="latitude"
									value={formData.latitude || ""}
									onChange={handleChange}
									className="mt-1 block w-full border border-gray-300 rounded-md p-2"
									placeholder="Latitude"
								/>
							</div>
							<div>
								<Label className="block text-sm font-medium text-gray-700">
									Longitude
								</Label>
								<FormInput
									type="number"
									name="longitude"
									value={formData.longitude || ""}
									onChange={handleChange}
									className="mt-1 block w-full border border-gray-300 rounded-md p-2"
									placeholder="Longitude"
								/>
							</div>
						</div>
						<Button
							type="button"
							onClick={handleLocation}
							className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
						>
							Get Current Location
						</Button>
					</section>

					{/* Action Buttons */}
					<div className="flex justify-end gap-4 pt-6">
						<Button
							type="button"
							onClick={onCancel}
							className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 transition"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
						>
							Save Changes
						</Button>
					</div>
				</FormComponent>
			</div>
		</div>
	);
};

export default EditProfile;
