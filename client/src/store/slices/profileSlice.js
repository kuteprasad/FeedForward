import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileService } from "../services/profile.service";

export const fetchProfile = createAsyncThunk(
	"profile/fetchProfile",
	async (_, { rejectWithValue }) => {
		try {
			const response = await profileService.fetchProfile();
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Failed to fetch profile"
			);
		}
	}
);

export const updateProfile = createAsyncThunk(
	"profile/updateProfile",
	async (profileData, { rejectWithValue }) => {
		try {
			const response = await profileService.updateProfile(profileData);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || "Failed to update profile"
			);
		}
	}
);

const profileSlice = createSlice({
	name: "profile",
	initialState: [],
	reducers: {
		resetProfile: () => initialState,
		updateField: (state, action) => {
			const { field, value } = action.payload;
			state[field] = value;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				(action) =>
					action.type.startsWith("profile/") &&
					action.type.endsWith("/pending"),
				(state) => {
					state.loading = true;
					state.error = null;
				}
			)
			.addMatcher(
				(action) =>
					action.type.startsWith("profile/") &&
					action.type.endsWith("/fulfilled"),
				(state, action) => {
					const data = action.payload.data;
					if (data) {
						Object.keys(data).forEach((key) => {
							if (data[key] !== undefined) {
								state[key] = data[key];
							}
						});
					}
					state.loading = false;
					state.error = null;
				}
			)
			.addMatcher(
				(action) =>
					action.type.startsWith("profile/") &&
					action.type.endsWith("/rejected"),
				(state, action) => {
					state.loading = false;
					state.error = action.payload;
				}
			);
	},
});

export const { resetProfile, updateField } = profileSlice.actions;
export default profileSlice.reducer;
