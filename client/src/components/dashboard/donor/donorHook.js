import { useState } from "react";
import { toast } from "react-hot-toast";
import { donorService } from "../../../services/donor.service";
import { profileService } from "../../../services/profile.service";
import { useSelector } from "react-redux";

export const useDonationForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    donorId: user?.id,
    foodItems: [],
    deliveryBy: "SELF",
    location: {
      address: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const handleAddFoodItem = (item) => {
    setFormData((prev) => ({
      ...prev,
      foodItems: [...prev.foodItems, item],
    }));
  };

  const handleRemoveFoodItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      foodItems: prev.foodItems.filter((_, i) => i !== index),
    }));
  };

  const handleDeliveryByChange = (deliveryBy) => {
    setFormData((prev) => ({
      ...prev,
      deliveryBy,
      deliveryPerson: deliveryBy === "NGO" ? undefined : prev.deliveryPerson,
    }));
  };

  const handleLocationUpdate = (address, latitude, longitude) => {
    setFormData((prev) => ({
      ...prev,
      location: { address, latitude, longitude },
    }));
  };

  const handleGetLocation = async () => {
    try {
      const location = await profileService.getLocation();
      handleLocationUpdate(
        formData.location.address,
        location.latitude,
        location.longitude
      );
    } catch (error) {
      console.error("Error getting location:", error);
      toast.error("Could not get location");
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("formData", formData);
      const response = await donorService.createPost(formData);
      console.log("response", response);
      if (response.status === 200) {
        setFormData({
          donorId: user?._id,
          foodItems: [],
          deliveryBy: "SELF",
          location: {
            address: "",
            latitude: 0,
            longitude: 0,
          },
        });

        setIsOpen(false);
        toast.success("Donation posted successfully!");
      } else {
        toast.error(response.data.message || "Failed to post donation");
      }
    } catch (error) {
      toast.error(`Unable to make your post: ${error.message}`);
    }
  };

  return {
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
  };
};
