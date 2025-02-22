import api from "./api";

export const donorService = {
  createPost: async (postData) => {
    try {
      const response = await api.post("/post/create", {
        ...postData,
        status: "PENDING",
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
