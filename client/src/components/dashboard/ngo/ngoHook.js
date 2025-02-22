import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ngoService } from "../../../services/ngo.service";

export const useNgoDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [processedPostIds, setProcessedPostIds] = useState(new Set());

  const { notifications, isConnected } = useSelector(
    (state) => state.websocket
  );
  const { user } = useSelector((state) => state.auth);

  // Handle new notifications
  useEffect(() => {
    const fetchNewDonations = async () => {
      try {
        for (const notification of notifications) {
          // Skip if we've already processed this post
          if (processedPostIds.has(notification.postId)) continue;

          const response = await ngoService.getPostById(notification.postId);
          if (response.success) {
            setDonations((prev) => [...prev, response.data]);
            setProcessedPostIds(
              (prev) => new Set([...prev, notification.postId])
            );
          }
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
        toast.error("Failed to load new donations");
      }
    };

    if (notifications.length > 0) {
      fetchNewDonations();
    }
  }, [notifications, processedPostIds]);

  const handleMakeRequest = async (postId) => {
    try {
      const response = await ngoService.sendRequest({
        postId,
        reqId: user.id,
      });

      if (response.success) {
        toast.success("Request sent successfully!");
        // Update donation status in UI if needed
      } else {
        toast.error(response.message || "Failed to send request");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send request");
    }
  };

  return {
    donations,
    user,
    handleMakeRequest,
  };
};
