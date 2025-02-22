import { useState } from "react";
import { Button } from "../../basic/Button";
import { useNgoDashboard } from "./ngoHook";
import { FormInput } from "../../basic/FormInput";

export default function NgoDashboard() {
  const {
    donations,
    user,
    handleMakeRequest,
    handleDeclineRequest,
    updateNgoDetails,
  } = useNgoDashboard();

  const [editingPost, setEditingPost] = useState(null);
  const [ngoDetails, setNgoDetails] = useState({
    location: { address: "", latitude: 0, longitude: 0 },
    deliveryPerson: { name: "", mobNo: "", vehicleNo: "" },
  });

  const handleUpdateDetails = (postId) => {
    updateNgoDetails(postId, ngoDetails);
    setEditingPost(null);
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
            className="bg-[var(--card-bg)] p-6 rounded-lg shadow-md border border-[var(--border)]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                {donation.donorName}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  donation.status === "ACCEPTED"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {donation.status}
              </span>
            </div>

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
              📍 {donation?.location?.address}
            </p>

            {donation.status === "ACCEPTED" && donation.ngoId === user.id ? (
              <>
                {editingPost === donation._id ? (
                  <div className="space-y-4">
                    <FormInput
                      placeholder="NGO Address"
                      value={ngoDetails.location.address}
                      onChange={(e) =>
                        setNgoDetails((prev) => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            address: e.target.value,
                          },
                        }))
                      }
                    />
                    {donation.deliveryBy === "NGO" && (
                      <>
                        <FormInput
                          placeholder="Delivery Person Name"
                          value={ngoDetails.deliveryPerson.name}
                          onChange={(e) =>
                            setNgoDetails((prev) => ({
                              ...prev,
                              deliveryPerson: {
                                ...prev.deliveryPerson,
                                name: e.target.value,
                              },
                            }))
                          }
                        />
                        <FormInput
                          placeholder="Mobile Number"
                          value={ngoDetails.deliveryPerson.mobNo}
                          onChange={(e) =>
                            setNgoDetails((prev) => ({
                              ...prev,
                              deliveryPerson: {
                                ...prev.deliveryPerson,
                                mobNo: e.target.value,
                              },
                            }))
                          }
                        />
                        <FormInput
                          placeholder="Vehicle Number"
                          value={ngoDetails.deliveryPerson.vehicleNo}
                          onChange={(e) =>
                            setNgoDetails((prev) => ({
                              ...prev,
                              deliveryPerson: {
                                ...prev.deliveryPerson,
                                vehicleNo: e.target.value,
                              },
                            }))
                          }
                        />
                      </>
                    )}
                    <Button
                      onClick={() => handleUpdateDetails(donation._id)}
                      className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
                    >
                      Update Details
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setEditingPost(donation._id)}
                    className="w-full bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)]"
                  >
                    Edit Details
                  </Button>
                )}
              </>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleMakeRequest(donation._id)}
                  disabled={donation.requestedBy?.includes(user.id)}
                  className="flex-1 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
                >
                  {donation.requestedBy?.includes(user.id)
                    ? "Request Sent"
                    : "Make Request"}
                </Button>
                <Button
                  onClick={() => handleDeclineRequest(donation._id)}
                  className="flex-1 bg-[var(--btn-danger-bg)] text-[var(--btn-danger-text)]"
                >
                  Decline
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
