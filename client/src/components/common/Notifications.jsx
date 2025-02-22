import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token,user } = useSelector((state) => state.auth); // Assume you have user data in Redux state

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Make POST request to fetch notifications based on userId
                console.log(user);
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/notifications/all`, { id: user._id });
                console.log(response);

                setNotifications(response.data); // Store notifications in state
            } catch (err) {
                console.error('Error fetching notifications:', err);
                setError('Failed to load notifications.');
            } finally {
                setLoading(false);
            }
        };

        if (user && user._id) {
            fetchNotifications(); // Call API only if user ID exists
        }
    }, [user]);

    if (loading) {
        return <div>Loading notifications...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification._id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                            <strong>{notification.type}</strong>
                            <p>{notification.message}</p>
                            <small>{new Date(notification.createdAt).toLocaleString()}</small>
                            {notification.isRead ? (
                                <span style={{ color: 'green' }}>Read</span>
                            ) : (
                                <span style={{ color: 'red' }}>Unread</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
