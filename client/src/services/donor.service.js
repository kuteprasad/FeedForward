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

  getDonations: async (donorId) => {
    try {
      const response = await api.get(`/post/donor/${donorId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPostById: async (postId) => {
    try {
      const response = await api.get(`/post/`, {
        params: { id: postId },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  acceptRequest: async (postId, ngoId) => {
    try {
      const response = await api.put(`/post/accept-request`, {
        postId,
        ngoId,
        status: "ACCEPTED",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePostStatus: async (postId, ngoId, action) => {
    try {
      const response = await api.put("/post/status", {
        postId,
        ngoId,
        action, // 'ACCEPT' or 'REJECT' or 'PACKED' or 'TRANSIT'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
