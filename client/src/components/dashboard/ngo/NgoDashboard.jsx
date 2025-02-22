import { Button } from "../../basic/Button";
import { useNgoDashboard } from "./ngoHook";

export default function NgoDashboard() {
  const { donations, user, handleMakeRequest } = useNgoDashboard();

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
