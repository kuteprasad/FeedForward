import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Hardcoded user ID for testing
                console.log("user", user);
                // console.log("user id", user.id);
                // const uid = '67b22e824ded6fbdeccd115f';
                // console.log(uid);

                // POST request to fetch notifications
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/notifications/all`, { id: user.id });

                // Extract data from response and store in state
                setNotifications(response.data.data); // Accessing the correct 'data' array in the response
            } catch (err) {
                console.error('Error fetching notifications:', err);
                setError('Failed to load notifications.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []); // No need for user as dependency, as user is hardcoded here

    // Function to fetch the post details by postId
    const fetchPost = async (postId) => {
        try {
            // Send GET request with the post ID in the URL
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/post/seepost`,
                {params:{
                    id:postId
                },}
            );
            
            // Handle the response (for example, store it in the state or process the data)
            console.log('Fetched Post:', response.data);
    
        } catch (err) {
            console.error('Error fetching post:', err);
            setError('Failed to load post.');
        }
    };

    if (loading) {
        return <div className="text-center text-gray-500">Loading notifications...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl text-center text-gray-800 mb-6">Notifications</h2>
            {notifications.length === 0 ? (
                <p className="text-center text-gray-500">No notifications</p>
            ) : (
                <ul className="space-y-4">
                    {notifications.map((notification) => (
                        <li
                            key={notification._id}
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:translate-y-1"
                        >
                            <div className="flex justify-between mb-2">
                                <strong className="text-lg text-gray-800">{notification.type}</strong>
                                
                                {/* Conditionally render the post ID for "NEWPOST" type */}
                                {notification.type === "NEWPOST" && (
                                    <p
                                        className="text-blue-500 cursor-pointer mb-2"
                                        onClick={() => fetchPost(notification.postId)}  // Pass the postId to fetchPost
                                    >
                                        SEE POST: {notification.postId}
                                    </p>
                                )}
                                
                                <small className="text-sm text-gray-500">
                                    {new Date(notification.createdAt).toLocaleString()}
                                </small>
                            </div>
                            <p className="text-gray-700 mb-2">{notification.message}</p>
                            {notification.isRead ? (
                                <span className="text-green-500 font-bold text-sm">Read</span>
                            ) : (
                                <span className="text-red-500 font-bold text-sm">Unread</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
