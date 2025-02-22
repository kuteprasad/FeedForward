import mongoose from 'mongoose';

// Enum for notification types
export const NotificationType = {
    NEWPOST: 'NEWPOST',
    MESSAGE: 'MESSAGE',
};

// Define the schema for Notification
const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true, 
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the sender
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the recipient
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // Reference to the User model for the recipient
      required: false,
    },
    message: {
      type: String,
      required: true, // The message for both types
    },
    isRead: {
      type: Boolean,
      default: false, // Whether the notification is read or not
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the notification creation time
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Notification model
export default mongoose.model('Notification', NotificationSchema);
