import express from 'express'; 
import {create,update,getpost,sendRequest,getDonations,acceptRequest} from '../controllers/post.controller.js'
import { updatestatus } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', create);
router.put('/update',update);
router.get('/getpost', getpost);
router.put('/sendrequest',sendRequest);
router.get("/donor/:donorId",getDonations);
router.put("/accept-request",acceptRequest);
router.put("/status",updatestatus);
// router.post('/login', login);

export default router;