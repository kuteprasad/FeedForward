import { getAllNotifications } from "../services/notificationService.js";

export const getnotifications = async (req, res) => {
    const post =req.body
    console.log(post);
    try {
    const response = await getAllNotifications(post.id);
    console.log(response);
    if (typeof response === 'object') {
        return res.status(200).json({ success: true, message: 'Post created successfully', data: response });
      } else {
        return res.status(500).json({ success: false, message: 'Failed to create post' });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}