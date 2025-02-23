import api from "./api";

export const ngoService = {
  getPostById: async (postId) => {
    try {
      const response = await api.get(`/post/getpost`, {
        params: { id: postId },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getReceivedRequests: async (ngoId) => {
    try {
      const response = await api.get(`/post/ngo/received/${ngoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  makeRequest: async (postId, ngoId) => {
    try {
      const response = await api.put(`/post/sendrequest`, {
        postId,
        reqId: ngoId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  declineRequest: async (postId, ngoId) => {
    try {
      const response = await api.put(`/post/status`, {
        postId,
        ngoId,
        action: "REJECT",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDeliveryDetails: async (postId, ngoDetails) => {
    try {
      const response = await api.put(`/post/ngo/update`, {
        postId,
        ...ngoDetails,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
