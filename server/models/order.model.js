import mongoose from 'mongoose';

// Define enums as objects
export const OrderStatus = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    COMPLETED: 'COMPLETED'
};

export const TrackStatus = {
    PACKED: 'PACKED',
    PICKUP: 'PICKUP',
    TRANSIT: 'TRANSIT',
    DELIVERED: 'DELIVERED'
};

export const DeliveryBy = {
    SELF: 'SELF',
    NGO: 'NGO',
    VOLUNTEER: 'VOLUNTEER'
};

export const QuantityType = {
    KG: 'KG',
    LITRE: 'LITRE',
    PIECES: 'PIECES',
    PLATES: 'PLATES'
};

const OrderSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        required: true,
    },
    requestedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    trackStatus: {
        type: String,
        enum: Object.values(TrackStatus),
    },
    deliveryBy: {
        type: String,
        enum: Object.values(DeliveryBy),
        required: true,
    },
    deliveredAt: { type: Date },
    deliveredPerson: {
        name: { type: String },
        mobNo: { type: String },
        vehicleNo: { type: String },
    },
    locationDonor: {
        address: { type: String },
        latitude: { type: Number },
        longitude: { type: Number }
    },
    locationNgo: {
        address: { type: String },
        latitude: { type: Number },
        longitude: { type: Number }
    },
    foodItems: [{
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        quantityType: {
            type: String,
            enum: Object.values(QuantityType),
            required: true,
        },
        photo: { type: String, required: false },
        expiryDate: {
            type: Date
        },
    }],
    feedback: { type: String },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
}, {
    timestamps: true
});

export default mongoose.model('Order', OrderSchema);