import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ngoService } from "../../../services/ngo.service";

export const useNgoDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [processedPostIds, setProcessedPostIds] = useState(new Set());
  const { notifications } = useSelector((state) => state.websocket);
  const { user } = useSelector((state) => state.auth);

  // Fetch initial received requests
  useEffect(() => {
    fetchReceivedRequests();
  }, []);

  // Handle notifications for updates
  useEffect(() => {
    const handleNotifications = async () => {
      for (const notification of notifications) {
        if (notification.postId) {
          // Get updated post data
          const updatedPost = await ngoService.getPostById(notification.postId);
          if (updatedPost.success) {
            setDonations((prev) =>
              prev.map((donation) =>
                donation._id === notification.postId
                  ? updatedPost.data
                  : donation
              )
            );
          }
        }
      }
    };

    if (notifications.length > 0) {
      handleNotifications();
    }
  }, [notifications]);

  const fetchReceivedRequests = async () => {
    try {
      const response = await ngoService.getReceivedRequests(user.id);
      if (response.success) {
        setDonations(response.data);
      }
    } catch (error) {
      toast.error("Failed to load received requests");
    }
  };

  const handleDeclineRequest = async (postId) => {
    try {
      const response = await ngoService.declineRequest(postId, user.id);
      if (response.success) {
        toast.success("Request declined");
        setDonations((prev) => prev.filter((d) => d._id !== postId));
      }
    } catch (error) {
      toast.error("Failed to decline request");
    }
  };

  const handleMakeRequest = async (postId) => {
    try {
      const response = await ngoService.makeRequest(postId, user.id);
      if (response.success) {
        toast.success("Request sent successfully");
        setDonations((prev) =>
          prev.map((donation) =>
            donation._id === postId
              ? { ...donation, requestedBy: [...donation.requestedBy, user.id] }
              : donation
          )
        );
      }
    } catch (error) {
      toast.error("Failed to send request");
    }
  };

  const updateNgoDetails = async (postId, ngoData) => {
    try {
      const response = await ngoService.updateNgoDetails(postId, {
        locationNgo: ngoData.location,
        deliveryPerson: ngoData.deliveryPerson,
      });
      if (response.success) {
        toast.success("Details updated successfully");
        setDonations((prev) =>
          prev.map((donation) =>
            donation._id === postId ? response.data : donation
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update details");
    }
  };

  return {
    donations,
    user,
    handleMakeRequest,
    handleDeclineRequest,
    updateNgoDetails,
  };
};
