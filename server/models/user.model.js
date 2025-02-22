import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true, lowercase: true, unique: true },
    username: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: false },
    role: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    longitude: { type: Number, required: false },
    latitude: { type: Number, required: false },
    photo: { type: String, required: false },
    fullName: { type: String, required: false },
    profession: { type: String, required: false },
    regNo: { type: String, required: false },
    orgType: { type: String, required: false },
    foodType: { type: String, required: false },
    motive: { type: String, required: false },
    employeeNos: { type: String, required: false },
    history: [{
        eventName: { type: String },
        photo: { type: String },
        address: { type: String },
        longitude: { type: Number },
        latitude: { type: Number },
        details: { type: String }
    }],
    location: {
        type: { 
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: false
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
            required: false
        },
    }
}, { timestamps: true });

// Create geospatial index
UserSchema.index({ location: '2dsphere' });

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);