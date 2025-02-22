import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import { io } from "../index.js";
import { getNearestLocations } from "../services/locationService.js";
import { addNotification } from "../services/notificationService.js";
import mongoose from "mongoose";

async function createPost(postData) {
  console.log("📦 Creating post with data:", postData);
  try {
    // Validate required fields
    if (!postData.donorId || !postData.location) {
      throw new Error("Missing required fields: donorId or location");
    }

    // Create and save new post
    const newPost = new Order(postData);
    await newPost.save();
    console.log("✅ Post saved with ID:", newPost._id);

    // Get nearby NGOs
    const radius = 20000; // 20km radius
    
    const locations = await getNearestLocations(
      postData.location.longitude,
      postData.location.latitude,
      radius
    );
    console.log(`Found ${locations.length} NGOs within ${radius}m radius`);

    // Process each NGO
    let ngos = [];
    const notificationPromises = [];

    for (const location of locations) {
      const ngoId = location._id;

      // Add post to NGO's requestReceived array
      const updatePromise = User.findByIdAndUpdate(
        ngoId,
        {
          $addToSet: {
            requestReceived: newPost._id, // Fix: was using ngoId instead of post._id
          },
        },
        { new: true }
      );

      // Create notification
      const notifi = {
        type: "NEWPOST",
        from: postData.donorId, // Fix: was using hardcoded ID
        to: ngoId,
        postId: newPost._id,
        message: "New donation available in your area",
        isRead: false,
      };

      notificationPromises.push(updatePromise, addNotification(notifi));
      ngos.push(ngoId);
    }

    // Wait for all updates and notifications
    await Promise.all(notificationPromises);

    // Send websocket notification
    io.emit(
      "notification",
      JSON.stringify({
        from: postData.donorId,
        to: ngos,
        postId: newPost._id,
        message: "New donation available in your area",
        type: "NEWPOST",
      })
    );

    // Update post with notified NGOs
    const updatedPost = await Order.findByIdAndUpdate(
      newPost._id,
      {
        $set: {
          notificationSent: ngos,
          status: "PENDING", // Add initial status
        },
      },
      { new: true }
    );

    console.log("✅ Post creation completed:", updatedPost._id);
    return updatedPost;
  } catch (error) {
    console.error("❌ Error in createPost:", error);
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
      postId: postId,
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
        reqId: reqId,
        updated: true,
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
  console.log("getdonations for : ",donorId);
  // (donorId)

  try {
    const donations = await Order.find({ donorId: donorId }).populate(
      "donorId"
    );
    console.log(donations);
    
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

export const acceptRequest = async (req, res) => {
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

export const updatestatus = async (req, res) => {
  const { postId,ngoId } = req.body;
  const {action} = req.body;
  console.log(req.body);
  try {
    const existing = await Order.findOne({ _id: postId }).exec();
    console.log(existing);
    if (existing) {
      try {
        const updatedPost = await Order.updateOne(
          { _id: postId },
          { $set: {status:action,ngoId:ngoId} },
          { new: true }
        );
        console.log("updated post is ", updatedPost);
        const notifi = {
          type: "NEWPOST",
          from: "60b8d6e6f92a4e1d8b6a3c47",
          to: ngoId,
          message: "Your request is accepted !",
          isRead: false,
        };
        const response = await addNotification(notifi);
        // console.log(response)
        io.emit(
          "notification",
          JSON.stringify({
            from: 'server',
            to: [ngoId],
            message: `Your request is accepted!`,
          })
        );
        
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
  }}

// Get all posts where NGO has received notifications
export const getNgoRequests = async (req, res) => {
  const { ngoId } = req.params;
  console.log("🔍 Fetching NGO requests for:", ngoId);

  try {
    // Find NGO and populate their requestReceived posts
    const ngoUser = await User.findById(ngoId).populate({
      path: "requestReceived",
      populate: {
        path: "donorId",
        select: "username",
      },
    });

    if (!ngoUser) {
      return res.status(404).json({
        success: false,
        message: "NGO not found",
      });
    }

    console.log("✅ Found NGO requests:", ngoUser.requestReceived);

    return res.status(200).json({
      success: true,
      data: ngoUser.requestReceived,
    });
  } catch (error) {
    console.error("❌ Error fetching NGO requests:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Decline a donation request
export const declineNgoRequest = async (req, res) => {
  const { postId, ngoId } = req.body;
  console.log("❌ Declining request:", { postId, ngoId });

  try {
    // Remove NGO from notificationSent array in Order
    const updatedPost = await Order.findByIdAndUpdate(
      postId,
      {
        $pull: {
          notificationSent: ngoId,
          requestedBy: ngoId,
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Remove postId from NGO's requestReceived array
    await User.findByIdAndUpdate(ngoId, { $pull: { requestReceived: postId } });

    // Send notification to donor
    const notifi = {
      type: "NEWPOST",
      from: ngoId,
      to: updatedPost.donorId,
      postId: postId,
      message: `NGO has declined the request`,
      isRead: false,
    };
    await addNotification(notifi);

    // Emit websocket notification
    io.emit(
      "notification",
      JSON.stringify({
        from: ngoId,
        to: [updatedPost.donorId],
        postId,
        message: "NGO has declined the request",
        updated: true,
      })
    );

    console.log("✅ Request declined successfully");

    return res.status(200).json({
      success: true,
      message: "Request declined successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("❌ Error declining request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update NGO details for accepted donation
export const updateNgoDetails = async (req, res) => {
  const { postId, locationNgo, deliveryPerson } = req.body;
  console.log("📝 Updating NGO details:", {
    postId,
    locationNgo,
    deliveryPerson,
  });

  try {
    // Update post with NGO details
    const updatedPost = await Order.findByIdAndUpdate(
      postId,
      {
        locationNgo,
        deliveryPerson,
        trackStatus: "PACKED", // Update track status when NGO adds details
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Send notification to donor
    const notifi = {
      type: "NEWPOST",
      from: updatedPost.ngoId,
      to: updatedPost.donorId,
      postId: postId,
      message: "NGO has updated delivery details",
      isRead: false,
    };
    await addNotification(notifi);

    // Emit websocket notification
    io.emit(
      "notification",
      JSON.stringify({
        from: updatedPost.ngoId,
        to: [updatedPost.donorId],
        postId,
        message: "NGO has updated delivery details",
        updated: true,
      })
    );

    console.log("✅ NGO details updated successfully");

    return res.status(200).json({
      success: true,
      message: "NGO details updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("❌ Error updating NGO details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
