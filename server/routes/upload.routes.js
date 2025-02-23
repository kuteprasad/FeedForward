import express from "express";
import { uploadImage } from "../controllers/upload.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/image", upload.single("image"), uploadImage);

export default router;
