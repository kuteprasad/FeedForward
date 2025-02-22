import api from "./api";

export const ngoService = {
  // Fetches specific post details by ID
  // Backend should:
  // 1. Find post by postId in Order collection
  // 2. Populate donor details from User collection (donorName only)
  // 3. Return post with donor information
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

  // Fetches all posts where NGO has received notifications
  // Backend should:
  // 1. Find NGO by ngoId in User collection
  // 2. Get posts from requestReceived array
  // 3. Populate each post with donor details
  // 4. Return array of posts
  getReceivedRequests: async (ngoId) => {
    try {
      const response = await api.get(`/post/ngo/received/${ngoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Declines a donation request
  // Backend should:
  // 1. Remove ngoId from notificationSent array in Order
  // 2. Remove postId from requestReceived array in NGO's User document
  // 3. Send notification to donor about decline
  // 4. Return updated post data
  declineRequest: async (postId, ngoId) => {
    try {
      const response = await api.put(`/post/ngo/decline`, {
        postId,
        ngoId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Makes a request for a donation
  // Backend should:
  // 1. Add ngoId to requestedBy array in Order
  // 2. Remove from notificationSent array in Order
  // 3. Remove from requestReceived in NGO's document
  // 4. Send notification to donor about new request
  // 5. Return updated post data
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

  // Updates NGO details for accepted donation
  // Backend should:
  // 1. Verify NGO is assigned to this post (ngoId matches)
  // 2. Update locationNgo and deliveryPerson fields in Order
  // 3. Send notification to donor about updated details
  // 4. Return updated post data
  updateNgoDetails: async (postId, ngoData) => {
    try {
      const response = await api.put(`/post/ngo/update`, {
        postId,
        ...ngoData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
