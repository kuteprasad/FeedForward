import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { donorService } from "../../../services/donor.service";

export const useMyDonations = () => {
  const [donations, setDonations] = useState([]);
  const { notifications } = useSelector((state) => state.websocket);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    const handleNotifications = async () => {
      for (const notification of notifications) {
        if (notification.postId && notification.updated) {
          const updatedPost = await donorService.getPostById(
            notification.postId
          );
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

    handleNotifications();
  }, [notifications]);

  const fetchDonations = async () => {
    try {
      const response = await donorService.getDonations(user.id);
      if (response.success) {
        setDonations(response.data);
      }
    } catch (error) {
      toast.error("Failed to load donations");
    }
  };

  const handleAcceptRequest = async (postId, ngoId) => {
    try {
      const response = await donorService.updatePostStatus(
        postId,
        ngoId,
        "ACCEPT"
      );
      if (response.success) {
        toast.success("Request accepted successfully");
        setDonations((prev) =>
          prev.map((donation) =>
            donation._id === postId ? response.data : donation
          )
        );
      }
    } catch (error) {
      toast.error("Failed to accept request");
    }
  };

  const handleRejectRequest = async (postId, ngoId) => {
    try {
      const response = await donorService.updatePostStatus(
        postId,
        ngoId,
        "REJECT"
      );
      if (response.success) {
        toast.success("Request rejected");
        setDonations((prev) =>
          prev.map((donation) =>
            donation._id === postId ? response.data : donation
          )
        );
      }
    } catch (error) {
      toast.error("Failed to reject request");
    }
  };

  const handlePackedStatus = async (postId, ngoId) => {
    try {
      const response = await donorService.updatePostStatus(
        postId,
        ngoId,
        "PACKED"
      );
      if (response.success) {
        toast.success("Status updated to Packed");
        setDonations((prev) =>
          prev.map((donation) =>
            donation._id === postId ? response.data : donation
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleTransitStatus = async (postId, ngoId) => {
    try {
      const response = await donorService.updatePostStatus(
        postId,
        ngoId,
        "TRANSIT"
      );
      if (response.success) {
        toast.success("Status updated to Transit");
        setDonations((prev) =>
          prev.map((donation) =>
            donation._id === postId ? response.data : donation
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return {
    donations,
    handleAcceptRequest,
    handleRejectRequest,
    handlePackedStatus,
    handleTransitStatus,
  };
};
