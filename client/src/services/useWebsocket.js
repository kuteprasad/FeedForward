import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
// import { useProfile } from './pages/useProfile';  // Assuming useProfile is in JS as well

const useWebSocket = () => {
  const { user } = useSelector(state => state.auth);
  // console.log(user)
//   const { user } = useProfile();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // console.log('Connecting to WebSocket server');
    const socket = io(import.meta.env.VITE_WEBSOCKET_API_URL);  // Update to your WebSocket server URL
    // console.log(import.meta.env.VITE_WEBSOCKET_API_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('notification', (message) => {
      // Assuming the message is a JSON string
      // console.log(message);
      try {
        message = JSON.parse(message);
        const receivers = message.to;
        // console.log(receivers);
        // console.log(message.message);
        console.log(user);
        if (receivers.includes(user.id)) {
          console.log(user.id);
          setNotifications((prev) => [...prev, message]);
        }
      } catch (error) { 
        console.error('Error parsing message:', error);
      }
    });

    return () => {
      console.log('Disconnecting from WebSocket server');
      socket.disconnect();
    };
  }, []);  // Adding dependency on user.email in case the user changes

  return notifications;
};



export default useWebSocket;
