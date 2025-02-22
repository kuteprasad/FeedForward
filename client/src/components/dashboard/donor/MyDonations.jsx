import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { donorService } from "../../../services/donor.service";
import { Button } from "../../basic/Button";

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const { notifications } = useSelector((state) => state.websocket);
  const { user } = useSelector((state) => state.auth);

  // Fetch initial donations
  useEffect(() => {
    fetchDonations();
  }, []);

  // Listen for notifications about post updates
  useEffect(() => {
    const handleNotifications = async () => {
      for (const notification of notifications) {
        if (notification.postId && notification.updated) {
          // Fetch updated post data
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
        // Update local state with new post data
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
        // Update local state by removing ngoId from requestedBy
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

  const getStatusBadgeClass = (status) => {
    const classes = {
      PENDING: "bg-yellow-100 text-yellow-800",
      ACCEPTED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      COMPLETED: "bg-blue-100 text-blue-800",
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${
      classes[status] || ""
    }`;
  };

  const renderStatusActions = (donation) => {
    if (donation.status === "ACCEPTED") {
      if (donation.trackStatus !== "PACKED") {
        return (
          <Button
            onClick={() => handlePackedStatus(donation._id, donation.ngoId)}
            variant="primary"
            className="text-sm px-3 py-1"
          >
            Mark as Packed
          </Button>
        );
      }

      if (donation.trackStatus === "PACKED" && donation.deliveryBy === "SELF") {
        return (
          <Button
            onClick={() => handleTransitStatus(donation._id, donation.ngoId)}
            variant="primary"
            className="text-sm px-3 py-1"
          >
            Start Transit
          </Button>
        );
      }

      if (donation.trackStatus === "PACKED" && donation.deliveryBy === "NGO") {
        return (
          <p className="text-sm text-[var(--text-secondary)]">
            NGO is on the way
          </p>
        );
      }
    }
    return null;
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-[var(--text)]">My Donations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-[var(--card-bg)] rounded-lg shadow-md p-6 border border-[var(--border)]"
          >
            {/* Status Badge */}
            <div className="flex justify-between items-center mb-4">
              <span className={getStatusBadgeClass(donation.status)}>
                {donation.status}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                {new Date(donation.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Food Items */}
            <div className="space-y-2 mb-4">
              <h3 className="font-semibold text-[var(--text)]">Food Items:</h3>
              {donation.foodItems.map((item, idx) => (
                <div key={idx} className="text-sm text-[var(--text)]">
                  {item.name} - {item.quantity} {item.quantityType}
                  {item.expiryDate && (
                    <span className="block text-[var(--text-secondary)]">
                      Expires: {new Date(item.expiryDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="mb-4">
              <h3 className="font-semibold text-[var(--text)]">
                Pickup Location:
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                📍 {donation.location.address}
              </p>
            </div>

            {/* Requests Section */}
            <div>
              <h3 className="font-semibold text-[var(--text)] mb-2">
                Requests:
              </h3>
              {donation.requestedBy?.length > 0 ? (
                <div className="space-y-2">
                  {donation.requestedBy.map((ngoId) => (
                    <div
                      key={ngoId}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-[var(--text)]">
                        NGO #{ngoId.slice(-4)}
                      </span>
                      {donation.status === "PENDING" && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              handleAcceptRequest(donation._id, ngoId)
                            }
                            variant="primary"
                            className="text-sm px-3 py-1"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() =>
                              handleRejectRequest(donation._id, ngoId)
                            }
                            variant="danger"
                            className="text-sm px-3 py-1"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--text-secondary)]">
                  No requests yet
                </p>
              )}
            </div>

            {/* Status Actions */}
            {renderStatusActions(donation)}
          </div>
        ))}
      </div>
    </div>
  );
}
