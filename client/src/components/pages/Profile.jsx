import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProfile from "./EditProfile";
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
import { profileService } from "../../services/profile.service";
import { useSelector } from "react-redux";
import { Label } from "../basic/Label";
import { Button } from "../basic/Button";
import { useNavigate } from "react-router-dom";
import NgoVerificationForm from "../dashboard/ngo/NgoVerificationForm";
// Uncomment if you have toast notifications configured
// import { toast } from "react-toastify";

const Profile = () => {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editing, setEditing] = useState(false);
	const [formData, setFormData] = useState({});
	const [profilePic, setProfilePic] = useState(null);
	const { user } = useSelector((state) => state.auth);

	const isVerifiedNgo = true;
	const navigate = useNavigate();
	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/auth/profile/${user?.id}`
				);
				if (response.data && response.data.success) {
					setProfile(response.data.user);
					setFormData(response.data.user);
					setProfilePic(response.data.user.photo || "/default-profile.png");
					console.log(profile);
				} else {
					setError("Failed to fetch profile data");
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchProfileData();
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/updateProfile`,
				formData
			);
			if (response.data && response.data.success) {
				setProfile(response.data.updatedUser || formData);
				setEditing(false);
			} else {
				setError("Failed to update profile");
			}
		} catch (err) {
			setError(err.message);
		}
	};

	const handleLocation = async () => {
		try {
			const location = await profileService.getLocation();
			setFormData((prev) => ({
				...prev,
				latitude: location.latitude,
				longitude: location.longitude,
			}));
			// toast.success("Location updated successfully");
		} catch (error) {
			// toast.error("Failed to get location");
			console.error(error);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
				Loading...
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
				{error}
			</div>
		);
	}

	return (
		<div className=" mx-auto  bg-white border border-gray-200 shadow-lg rounded-lg p-6">
			{/* Profile Header */}
			<section className="p-6 bg-[var(--primary)]  rounded shadow">
				<h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
					<FaUser /> Personal Information
				</h3>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
					<div className="flex flex-col items-center">
						<Label className="block text-sm font-medium text-gray-700">
							Profile Photo
						</Label>

						<div className="relative w-24 h-24 mt-2">
							<img
								src={profile.photo || "/default-profile.png"}
								alt="Profile"
								className="w-24 h-24 object-cover rounded-full border border-gray-200"
							/>
							<Label className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer">
								<FaCamera
									className="text-white"
									size={14}
								/>
								<input
									type="file"
									accept="image/*"
									// onChange={handleFileChange}
									className="hidden"
								/>
							</Label>
						</div>
					</div>
					<div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
						<p className="text-lg text-gray-700 flex items-center gap-2">
							<FaUser /> <span>Username: {profile.username}</span>
						</p>
						<p className="text-lg text-gray-700 flex items-center gap-2">
							<FaEnvelope /> <span>Email: {profile.email}</span>
						</p>
						<p className="text-lg text-gray-700 flex items-center gap-2">
							<FaPhone /> <span>Mobile: {profile.mobileNo}</span>
						</p>
						<p className="text-lg text-gray-700 flex items-center gap-2">
							<FaBuilding /> <span>Full Name: {profile.fullName}</span>
						</p>
					</div>
				</div>
			</section>

			{/* Organization Information */}
			{(profile.role === "ngo" || profile.role === "donor") && (
				<section className="mb-6 p-6 bg-[var(--primary)]  rounded shadow mt-4">
					<h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
						<FaBuilding /> Organization Information
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
						<p className="text-lg text-gray-700 flex items-center gap-2">
							<FaIdBadge /> <span>Type: {profile.orgType}</span>
						</p>
					</div>
					{profile.role === "ngo" && (
						<div className="mt-4 space-y-2">
							<p className="text-lg text-gray-700 flex items-center gap-2">
								<FaIdBadge /> <span>Registration No: {profile.regNo}</span>
							</p>
							<p className="text-lg text-gray-700 flex items-center gap-2">
								<FaIdBadge /> <span>Motive: {profile.motive}</span>
							</p>
						</div>
					)}
				</section>
			)}

			{/* Address Information */}
			<section className="p-6 bg-[var(--primary)] rounded shadow">
				<h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
					<FaMapMarkerAlt /> Address Information
				</h3>
				<p className="text-lg text-gray-700 flex items-center gap-2 mt-3">
					<FaRoad /> <span>Address: {profile.address}</span>
				</p>
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<p className="text-lg text-gray-700 flex items-center gap-2">
						<FaMapMarkerAlt /> <span>Latitude: {profile.latitude || "-"}</span>
					</p>
					<p className="text-lg text-gray-700 flex items-center gap-2">
						<FaRoad /> <span>Longitude: {profile.longitude || "-"}</span>
					</p>
				</div>
			</section>

			<section>
				{profile?.isVerifiedNgo && <NgoVerificationForm />}
				<div className="flex justify-between items-center mt-6">
					<Button
						onClick={() => setEditing(true)}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
					>
						Edit Profile
					</Button>
				</div>
			</section>

			{/* Edit Profile Modal */}
			{editing && (
				<EditProfile
					formData={formData}
					setFormData={setFormData}
					handleChange={handleChange}
					handleUpdate={handleUpdate}
					// handleFileChange={handleFileChange}
					handleLocation={handleLocation}
					onCancel={() => setEditing(false)}
				/>
			)}
		</div>
	);
};

export default Profile;
