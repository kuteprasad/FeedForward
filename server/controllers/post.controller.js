
import Order from "../models/order.model.js";
import {io} from "../index.js"
import { getNearestLocations } from "../services/locationService.js";
import { addNotification } from "../services/notificationService.js";

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
            const ids = locations[i]['_id'];
            ngos.push(ids);
            const  notifi={
                "type": "NEWPOST",
                "from": "60b8d6e6f92a4e1d8b6a3c47",
                "to": ids,
                'postId':newPost._id,
                "message": "Post is created by donor in your area",
                "isRead": false
              }
            const response = await addNotification(notifi);


        }


        io.emit("notification", JSON.stringify({
            from: newPost.donorId,
            to: ngos,
            postId:postData._id,
            message: `Post is created by donor in your area`
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

export const update = async (req,res)=>{
    const postData = req.body;
    console.log(postData);
    try {
        const existing = await Order.findOne({ _id: postData.postId }).exec();
        console.log(existing);
        if(existing){
            try {
                const updatedPost=  await Order.updateOne({_id:postData.postId},{$set:postData}).exec();
                console.log("updated post is ",updatedPost);
                const  notifi={
                    "type": "NEWPOST",
                    "from": "60b8d6e6f92a4e1d8b6a3c47",
                    "to": postData.ngoId,
                    "message": "You received new donation!",
                    "isRead": false
                  }
                const response = await addNotification(notifi);
                io.emit("notification", JSON.stringify({
                    from: newPost.donorId,
                    to: [postData.ngoId],
                    message: `You received new donation!`
                }));
                if(response){
                    console.log("notification added");
                }

                return res.status(200).json({ success: true, message: 'Post updated successfully', data: updatedPost });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Failed to update post',error: error.message });
            }
            
        }
        else{
            return res.status(500).json({ success: false, message: 'Post does not exist' });
        }
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}