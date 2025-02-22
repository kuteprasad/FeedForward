import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import {io} from '../index.js'

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Helper function to format user response
const formatUserResponse = (user) => {
    return {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        role: user.role
    };
};

export const register = async (req, res) => {
    try {

        const { email, username, password, role } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create user
        const user = await User.create({
            email,
            username,
            password,
            role
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: formatUserResponse(user)
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        io.emit("notification","login attempt found");
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("user not found");
            
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            token,
            user: formatUserResponse(user)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};