// import notificationModel from "../models/notification.model.js"
import Notification from "../models/notification.model.js"


const  notifi={
    "type": "NEWPOST",
    "from": "60b8d6e6f92a4e1d8b6a3c47",
    "to": "60b8d6e6f92a4e1d8b6a3c48",
    "message": "You have a new post!",
    "isRead": false
  }

export async function addNotification(data) {
    try{
        console.log(Notification);
        // const newNotification = new Notification(data);
        // await newNotification.save();
        const newNotification =  await Notification.insertOne(data);
        
        console.log("Notification added successfully");
        
        return { message: "Notification created successfully", data: newNotification };

    }
    catch(error){
        console.log("error in adding notification: ", error);
        return error;
    }
}

// addNotification(notifi);


export async function getAllNotifications(id) {
    try {
        const data = await Notification.find({'to':id})
        return data;
    } catch (error) {
        console.log("error in notification service: ",error);
        return error;
    }
}