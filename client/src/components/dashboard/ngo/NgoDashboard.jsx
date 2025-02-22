import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Button } from "../../basic/Button";

export default function NgoDashboard() {
  const [donations, setDonations] = useState([]);

  const { notifications, isConnected, error } = useSelector((state) => state.websocket);

  // Mock data structure for a donation
  const dummyDonation = {
    donorName: "John Doe",
    foodItems: [
      {
        name: "Rice",
        quantity: 5,
        quantityType: "KG",
        expiryDate: "2024-02-25",
      },
    ],
    location: {
      address: "123 Main St",
      latitude: 18.5204,
      longitude: 73.8567,
    },
  };

  useEffect(() => {
    if (notifications.length > 0) {
      console.log("notif : ", notifications);
      console.log("posti", notifications[0].postId);
      // Add new donation to the list
      setDonations((prev) => [...prev, dummyDonation]);
    }
  }, [notifications]);

  const handleMakeRequest = (donationId) => {
    // Handle making request logic here
    console.log("Making request for donation:", donationId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[var(--text)]">
        Available Donations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation, index) => (
          <div
            key={index}
            className="bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] 
                     p-6 rounded-lg shadow-md border border-[var(--border)]"
          >
            <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">
              {donation.donorName}
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
              onClick={() => handleMakeRequest(index)}
              className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
            >
              Make Request
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
