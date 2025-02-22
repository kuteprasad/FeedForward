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

  sendRequest: async (requestData) => {
    try {
      const response = await api.put("/post/sendrequest", requestData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

//   getAllDonations: async () => {
//     try {
//       const response = await api.get("/post/available");
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
};
