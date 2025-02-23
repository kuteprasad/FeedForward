import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Convert buffer to base64
    const fileStr = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "feedforward",
    });

    console.log("✅ Image uploaded to Cloudinary:", uploadResponse.secure_url);

    return res.status(200).json({
      success: true,
      imageUrl: uploadResponse.secure_url,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};
