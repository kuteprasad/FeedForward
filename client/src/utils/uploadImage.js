import axios from "axios";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/upload/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      console.log("✅ Image uploaded successfully");
      return response.data.imageUrl;
    } else {
      throw new Error(response.data.message || "Upload failed");
    }
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    throw error;
  }
};
