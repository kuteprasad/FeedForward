import express from 'express'; 
import {create} from '../controllers/post.controller.js'

const router = express.Router();

router.post('/create', create); 
// router.post('/login', login);

export default router;