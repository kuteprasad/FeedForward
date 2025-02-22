import express from "express";
import {
  create,
  update,
  getpost,
  sendRequest,
  getDonations,
  acceptRequest,
  getNgoRequests, // Add these
  declineNgoRequest, // new
  updateNgoDetails,
  updatestatus, // routes
} from "../controllers/post.controller.js";

const router = express.Router();

// Existing routes
router.post("/create", create);
router.put("/update", update);
router.get("/getpost", getpost);
router.put("/sendrequest", sendRequest);
router.get("/donor/:donorId", getDonations);
router.put("/accept-request", acceptRequest);
router.put("/status", updatestatus);

// New NGO routes
router.get("/ngo/received/:ngoId", getNgoRequests);
router.put("/ngo/decline", declineNgoRequest);
router.put("/ngo/update", updateNgoDetails);

export default router;
