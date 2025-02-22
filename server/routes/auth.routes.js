import express from "express";
import {
	register,
	login,
	fetchProfile,
	updateProfile,
	verifyNgo,
	getNonVerifiedNgos,
	applyForNgoVerification,
	updateProfileImage,
} from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:userId", fetchProfile);
router.post("/updateProfile", updateProfile);
router.post("/updateProfilePic", upload.single("image"), updateProfileImage);
router.post("/verifyNgo", verifyNgo);
router.get("/nonVerifiedNgos", getNonVerifiedNgos);
router.post(
	"/applyForVerification",
	upload.single("image"),
	applyForNgoVerification
);

export default router;
