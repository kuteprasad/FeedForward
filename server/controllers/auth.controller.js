import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { io } from "../index.js";
import sharp from "sharp";
import cloudinary from "../utils/cloudinaryFn.js";

// Generate JWT Token
const generateToken = (userId) => {
	return jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

// Helper function to format user response
const formatUserResponse = (user) => {
	return {
		id: user._id.toString(),
		email: user.email,
		username: user.username,
		role: user.role,
		// Add additional fields here if needed
	};
};

export const register = async (req, res) => {
	try {
		const { email, username, password, role } = req.body;

		// Check if user exists
		const userExists = await User.findOne({ $or: [{ email }, { username }] });
		if (userExists) {
			return res.status(400).json({
				success: false,
				message: "User already exists",
			});
		}

		// Create user
		const user = await User.create({
			email,
			username,
			password,
			role,
		});

		// Generate token
		const token = generateToken(user._id);

		res.status(201).json({
			success: true,
			token,
			user: formatUserResponse(user),
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		io.emit("notification", "login attempt found");

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			console.log("user not found");
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		// Check password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		// Generate token
		const token = generateToken(user._id);

		res.json({
			success: true,
			token,
			user: formatUserResponse(user),
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Fetch profile information by user ID
export const fetchProfile = async (req, res) => {
	try {
		// Assuming user ID is passed as a URL parameter, e.g., /api/profile/:id
		const userId = req.params.userId;
		const user = await User.findById(userId).select("-password");
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		res.json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Update profile information by user ID
export const updateProfile = async (req, res) => {
	try {
		console.log(req.body);
		console.log(req.file);
		// Assuming user ID is passed as a URL parameter, e.g., /api/profile/:id
		const userId = req.body._id;
		const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		res.json({
			success: true,
			updatedUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const verifyNgo = async (req, res) => {
	try {
		const { ngoId, isVerifiedNgo } = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			ngoId,
			{ isVerifiedNgo },
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "NGO not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "NGO verification status updated",
			user: updatedUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const getNonVerifiedNgos = async (req, res) => {
	try {
		const nonVerifiedNgos = await User.find({
			isVerifiedNgo: false,
			role: "ngo",
		}).select("_id email username mobileNo address certificate");

		res.status(200).json({
			success: true,
			ngos: nonVerifiedNgos,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const applyForNgoVerification = async (req, res) => {
	try {
		const certificateImage = req.file;

		console.log("Req body ", req.body);
		const { ngoId, registrationNumber } = req.body;

		console.log(ngoId);
		if (!certificateImage) {
			return res.json({ message: "Certificate image required" });
		}

		// Process image using Sharp
		const optimizedImageBuffer = await sharp(certificateImage.buffer)
			.resize({ width: 800, height: 800, fit: "inside" })
			.toFormat("jpeg", { quality: 80 })
			.toBuffer();

		const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
			"base64"
		)}`;

		console.log("we are here ");
		const cloudResponse = await cloudinary.uploader.upload(fileUri);
		console.log(
			"Certificate Uploaded to Cloudinary:",
			cloudResponse.secure_url
		);

		console.log("we are");
		const updatedNgo = await User.findByIdAndUpdate(
			ngoId,
			{
				certificate: cloudResponse.secure_url,
				regNo: registrationNumber,
			},
			{ new: true }
		);

		if (!updatedNgo) {
			return res.status(404).json({
				success: false,
				message: "NGO not found",
			});
		}

		console.log("Updated");
		return res.json({
			message: "NGO verification application submitted",
			ngo: updatedNgo,
			success: true,
		});
	} catch (error) {
		console.error("Error in applyForNgoVerification:", error.message);
		return res
			.status(500)
			.json({ message: "Server error", error: error.message });
	}
};

// Let me know if you want me to hook this up with the frontend! 🚀

export const updateProfileImage = async (req, res) => {
	try {
		const profileImage = req.file;
		console.log("", profileImage);
		const { userId } = req.body;

		if (!profileImage) {
			return res.status(400).json({ message: "Profile image is required" });
		}

		// Process image using Sharp
		const optimizedImageBuffer = await sharp(profileImage.buffer)
			.resize({ width: 400, height: 400, fit: "cover" })
			.toFormat("jpeg", { quality: 80 })
			.toBuffer();

		const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
			"base64"
		)}`;
		const cloudResponse = await cloudinary.uploader.upload(fileUri);

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ profilePhoto: cloudResponse.secure_url },
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.json({
			message: "Profile photo updated successfully",
			user: updatedUser,
			success: true,
		});
	} catch (error) {
		console.error("Error updating profile image:", error.message);
		return res
			.status(500)
			.json({ message: "Server error", error: error.message });
	}
};
