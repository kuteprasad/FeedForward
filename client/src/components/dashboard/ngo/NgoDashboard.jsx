import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ngoService } from "../../../services/ngo.service";
import { Button } from "../../basic/Button";

export default function NgoDashboard() {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[var(--text)]">
        Available Donations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] 
                     p-6 rounded-lg shadow-md border border-[var(--border)]"
          >
            <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">
              Donation #{donation._id.slice(-4)}
            </h3>

            <div className="space-y-2 mb-4">
              {donation.foodItems.map((item, idx) => (
                <p key={idx} className="text-[var(--text)]">
                  {item.name} - {item.quantity} {item.quantityType}
                  <br />
                  <span className="text-sm text-[var(--text-secondary)]">
                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                  </span>
                </p>
              ))}
            </div>

            <p className="text-sm text-[var(--text-secondary)] mb-4">
              📍 {donation.location.address}
            </p>

            <Button
              onClick={() => handleMakeRequest(donation._id)}
              disabled={donation.requestedBy?.includes(user.id)}
              className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
            >
              {donation.requestedBy?.includes(user.id)
                ? "Request Sent"
                : "Make Request"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
