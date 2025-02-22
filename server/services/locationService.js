import User from "../models/user.model.js";
export async function getNearestLocations(longitude, latitude, distance) {
    // return await LocationRepo.getNearestLocations(longitude, latitude);
    try {
        console.log("🔍 Finding nearest locations");
        const locations = await User.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    }
                }
            }
        }).limit(5); // You can adjust the limit as needed
        console.log("✅ Found nearest locations:", locations);
        return locations;
    } catch (err) {
        console.log("Error in finding locations", err);
        return err;
    }
}
