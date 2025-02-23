import { Button } from "../../basic/Button";
import { useMyDonations } from "./myDonationHook";

export default function MyDonations() {
  const {
    donations,
    handleAcceptRequest,
    handleRejectRequest,
    handlePackedStatus,
    handleTransitStatus,
  } = useMyDonations();

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

            <div className="mb-4">
              <h3 className="font-semibold text-[var(--text)]">
                Pickup Location:
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                📍 {donation?.locationDonor?.address || "Location not set"}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-[var(--text)]">
                Drop Location:
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                📍 {donation?.locationNgo?.address || "Location not set"}
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
                        NGO : {donation.ngoName}
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
