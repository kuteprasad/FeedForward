import api from "./api";
export const profileService = {
	fetchProfile: () => {
		console.log("fetching profile...");
		return api.get("/profile");
	},

	// Update user profile
	updateProfile: (data) => {
		console.log("updating profile...", data);
		return api.put("/profile", data);
	},

	// Update profile photo
	updatePhoto: async (file) => {
		const formData = new FormData();
		formData.append("photo", file);
		console.log("updating photo...");
		return api.put("/profile/photo", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},

	getLocation: async () => {
		return new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				reject(new Error("Geolocation is not supported by your browser"));
			}

			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				(error) => {
					reject(new Error("Unable to retrieve your location"));
				}
			);
		});
	},
};
