import { useState } from "react";
import { Button } from "../../basic/Button";
import { Modal } from "../../basic/Modal";
import { Label } from "../../basic/Label";
import { FormInput } from "../../basic/FormInput";
import { Toggle } from "../../basic/Toggle";
import { FileInput } from "../../basic/FileInput";
import { useDonationForm } from "./donorHook.js";
import { useSelector } from "react-redux";

export default function DonorDashboard() {
  const {
    isOpen,
    setIsOpen,
    formData,
    setFormData,
    handleAddFoodItem,
    handleRemoveFoodItem,
    handleDeliveryByChange,
    handleLocationUpdate,
    handleGetLocation,
    handleSubmit,
  } = useDonationForm();

  const { notifications, isConnected } = useSelector((state) => state.websocket);
  console.log(notifications);

  const [newItem, setNewItem] = useState({});

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity && newItem.quantityType) {
      handleAddFoodItem(newItem);
      setNewItem({});
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200 hover:bg-primary-dark"
      >
        Donate Now
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Donation">
        <div className="space-y-6">
          {/* Food Items Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Food Items</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              <FormInput
                placeholder="Item Name"
                value={newItem.name || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <FormInput
                type="number"
                placeholder="Quantity"
                value={newItem.quantity || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    quantity: Number(e.target.value),
                  }))
                }
              />
              <select
                className="form-select p-3 rounded-lg border border-gray-300"
                value={newItem.quantityType || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    quantityType: e.target.value,
                  }))
                }
              >
                <option value="">Select Unit</option>
                <option value="KG">Kilograms</option>
                <option value="LITRE">Liters</option>
                <option value="PIECES">Pieces</option>
              </select>
              <FileInput
                id="food-photo"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setNewItem((prev) => ({
                      ...prev,
                      photo: e.target.files[0],
                    }));
                  }
                }}
              />
              <FormInput
                type="date"
                placeholder="Expiry Date"
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    expiryDate: new Date(e.target.value),
                  }))
                }
              />
              <Button
                onClick={handleAddItem}
                type="button"
                variant="secondary"
                className="w-full mt-4"
              >
                Add Item
              </Button>
            </div>

            {/* List of added items */}
            <div className="space-y-2">
              {formData.foodItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <span>
                    {item.name} - {item.quantity} {item.quantityType}
                  </span>
                  <Button
                    onClick={() => handleRemoveFoodItem(index)}
                    type="button"
                    variant="danger"
                    className="text-red-600"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Section */}
          <div>
            <Label>Delivery By</Label>
            <Toggle
              checked={formData.deliveryBy === "SELF"}
              onChange={() =>
                handleDeliveryByChange(formData.deliveryBy === "SELF" ? "NGO" : "SELF")
              }
              labelLeft="NGO"
              labelRight="Self"
            />

            {formData.deliveryBy === "SELF" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <FormInput
                  placeholder="Delivery Person Name"
                  onChange={(e) =>
                    setFormData((prev) => ({
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
                  onChange={(e) =>
                    setFormData((prev) => ({
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      deliveryPerson: {
                        ...prev.deliveryPerson,
                        vehicleNo: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            )}
          </div>

          {/* Location Section */}
          <div className="space-y-6">
            <Label>Pickup Location</Label>
            <FormInput
              placeholder="Address"
              value={formData.location.address}
              onChange={(e) =>
                handleLocationUpdate(e.target.value, formData.location.latitude, formData.location.longitude)
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput
                type="number"
                step="any"
                placeholder="Latitude"
                value={formData.location.latitude || ""}
                onChange={(e) =>
                  handleLocationUpdate(formData.location.address, parseFloat(e.target.value), formData.location.longitude)
                }
              />
              <FormInput
                type="number"
                step="any"
                placeholder="Longitude"
                value={formData.location.longitude || ""}
                onChange={(e) =>
                  handleLocationUpdate(formData.location.address, formData.location.latitude, parseFloat(e.target.value))
                }
              />
            </div>
            <Button
              onClick={handleGetLocation}
              className="w-full mt-4 bg-blue-500 text-white"
              type="button"
            >
              Get Current Location
            </Button>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white mt-8 py-3 rounded-lg shadow-md transition-all duration-200 hover:bg-green-600"
          >
            Confirm Posting
          </Button>
        </div>
      </Modal>
    </div>
  );
}
