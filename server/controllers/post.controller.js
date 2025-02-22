import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import { io } from "../index.js";
import { getNearestLocations } from "../services/locationService.js";
import { addNotification } from "../services/notificationService.js";
import mongoose from "mongoose";

async function createPost(postData) {
  // console.log();
  console.log("📦 Creating post");
  try {
    const newPost = new Order(postData);
    await newPost.save();

    console.log("✅ Post created successfully:");
    const locations = await getNearestLocations(
      postData.location.longitude,
      postData.location.latitude,
      20000
    );

    // console.log(locations);
    let ngos = [];
    for (let i in locations) {
      const ids = locations[i]["_id"];
      ngos.push(ids);
      const notifi = {
        type: "NEWPOST",
        from: "60b8d6e6f92a4e1d8b6a3c47",
        to: ids,
        postId: newPost._id,
        message: "Post is created by donor in your area",
        isRead: false,
      };
      //   console.log("notification", notifi);
      const response = await addNotification(notifi);
    }

    io.emit(
      "notification",
      JSON.stringify({
        from: newPost.donorId,
        to: ngos,
        postId: newPost._id,
        message: `Post is created by donor in your area`,
      })
    );

    return newPost.toObject();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export const create = async (req, res) => {
  const post = req.body;
  console.log(post);
  try {
    const response = createPost(post);
    if (typeof response === "object") {
      return res.status(200).json({
        success: true,
        message: "Post created successfully",
        data: response,
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create post" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const update = async (req, res) => {
  const postData = req.body;
  console.log(postData);
  try {
    const existing = await Order.findOne({ _id: postData.postId }).exec();
    console.log(existing);
    if (existing) {
      try {
        const updatedPost = await Order.updateOne(
          { _id: postData.postId },
          { $set: postData }
        ).exec();
        console.log("updated post is ", updatedPost);
        const notifi = {
          type: "NEWPOST",
          from: "60b8d6e6f92a4e1d8b6a3c47",
          to: postData.ngoId,
          message: "You received new donation!",
          isRead: false,
        };
        const response = await addNotification(notifi);
        io.emit(
          "notification",
          JSON.stringify({
            from: newPost.donorId,
            to: [postData.ngoId],
            message: `You received new donation!`,
          })
        );
        if (response) {
          console.log("notification added");
        }

        return res.status(200).json({
          success: true,
          message: "Post updated successfully",
          data: updatedPost,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to update post",
          error: error.message,
        });
      }
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Post does not exist" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getpost = async (req, res) => {
  const { id } = req.query;
  console.log(id);

  try {
    // Using aggregation to join Order and User collections
    const data = await Order.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "donorId",
          foreignField: "_id",
          as: "donor",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "ngoId",
          foreignField: "_id",
          as: "ngo",
        },
      },
      {
        $project: {
          postId: "$_id",
          donorId: 1,
          donorName: { $arrayElemAt: ["$donor.username", 0] },
          ngoId: 1,
          status: 1,
          requestedBy: 1,
          trackStatus: 1,
          deliveryBy: 1,
          deliveredAt: 1,
          deliveredPerson: 1,
          locationDonor: 1,
          locationNgo: 1,
          foodItems: 1,
          feedback: 1,
          rating: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
        },
      },
    ]);

    if (data && data.length > 0) {
        console.log("data[0]: ", data[0]);

      return res.status(200).json({
        success: true,
        message: "Post found successfully",
        data: data[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
  } catch (error) {
    console.log("Error in postController: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const sendRequest = async (req, res) => {
  const { reqId, postId } = req.body;
console.log("sendRequest received");
  try {
    const response = await Order.findOneAndUpdate(
      { _id: postId }, // Filter by postId (ensure it's a valid ID)
      { $addToSet: { requestedBy: reqId } }, // Push reqId into the requestedBy array
      { new: true } // Return the updated document
    );

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const requester = await User.findById(reqId).exec();
    const notifi = {
      type: "NEWPOST",
      from: reqId,
      to: response.donorId,
      postId:postId,
      message: `request for food by ${reqId}`,
      requester: requester,
      isRead: false,
    };
    const data = await addNotification(notifi);
    io.emit(
      "notification",
      JSON.stringify({
        from: "system",
        to: [response.donorId],
        reqId:reqId,
        updated:true,
        message: `request for food by ${reqId}`,
      })
    );

console.log("sendRequest successfull");

    return res.status(200).json({
      success: true,
      message: "Request added successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error in sendRequest:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const getDonations = async (req, res) => {
  const { donorId } = req.params;

  try {
    const donations = await Order.find({ donorId: donorId }).populate(
      "donorId",
      "username"
    );

    if (!donations || donations.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No donations found for this donor" });
    }

    return res.status(200).json({
      success: true,
      message: "Donations retrieved successfully",
      data: donations,
    });
  } catch (error) {
    console.error("Error in getDonations:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const acceptRequest = async (req,res)=>{
  const postData = req.body;
  console.log(postData);
  try {
    const existing = await Order.findOne({ _id: postData.postId }).exec();
    console.log(existing);
    if (existing) {
      try {
        const updatedPost = await Order.updateOne(
          { _id: postData.postId },
          { $set: postData }
        ).exec();
        console.log("updated post is ", updatedPost);
        const notifi = {
          type: "NEWPOST",
          from: "60b8d6e6f92a4e1d8b6a3c47",
          to: postData.ngoId,
          message: "You received new donation!",
          isRead: false,
        };
        const response = await addNotification(notifi);
        io.emit(
          "notification",
          JSON.stringify({
            from: newPost.donorId,
            to: [postData.ngoId],
            message: `You received new donation!`,
          })
        );
        if (response) {
          console.log("notification added");
        }

        return res.status(200).json({
          success: true,
          message: "Post updated successfully",
          data: updatedPost,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to update post",
          error: error.message,
        });
      }
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Post does not exist" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export const updatestatus = async (req,res)=>{
  
}