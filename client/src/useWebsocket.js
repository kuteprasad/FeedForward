import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// import { useProfile } from './pages/useProfile';  // Assuming useProfile is in JS as well

const useWebSocket = () => {
//   const { user } = useProfile();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');  // Update to your WebSocket server URL

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('notification', (message) => {
      // Assuming the message is a JSON string
      console.log(message);
    //   try {
    //     message = JSON.parse(message);
    //     const receivers = message.to;
    //     console.log(receivers);
    //     console.log(message.message);

    //     // Check if the user's email is included in the receivers list
    //     if (receivers.includes(user?.email)) {
    //       console.log(user?.email);
    //       setNotifications((prev) => [...prev, message.message]);
    //     }
    //   } catch (error) {
    //     console.error('Error parsing message:', error);
    //   }
    });

    return () => {
      socket.disconnect();
    };
  }, []);  // Adding dependency on user.email in case the user changes

  return notifications;
};



export default useWebSocket;
