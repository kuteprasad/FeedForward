// Required dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import http from 'http';
import { Server } from 'socket.io';



// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',  // Allow your React app's URL (adjust accordingly)
    methods: ['GET', 'POST'],
  }
});



// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/post',postRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

server.listen(PORT,()=>{
  console.log(`Server AND SOCKET is running on port ${PORT}`);
});


io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('notification', "added you");
  // Listen for custom events
  socket.on('message', (message) => {
      console.log('Received message: ', message);
      // Emit the message to all connected clients

  });

  // Handle disconnection
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
}); 

export {io};