
import Order from "../models/order.model.js";
import {io} from "../index.js"
import { getNearestLocations } from "../services/locationService.js";

async function createPost(postData) {
    // console.log();
    console.log("📦 Creating post");
    try {
        const newPost = new Order(postData);
        await newPost.save();

        console.log("✅ Post created successfully:");
        const locations = await getNearestLocations(postData.location.longitude, postData.location.latitude, 20000);
        
        // console.log(locations);
        let ngos = [];
        for (let i in locations) {
            const email = locations[i]['email'];
            ngos.push(email);
        }

        io.emit("notification", JSON.stringify({
            from: newPost.donorId,
            to: ngos,
            message: `Post is created by ${newPost.donorId}`
        }));
        
        return newPost.toObject();
        
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}

export const create = async (req, res) => {
    const post =req.body
    console.log(post);
    try {
    const response = createPost(post);
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