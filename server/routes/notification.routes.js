import express from 'express'; 
import { getnotifications } from '../controllers/notifications.controller.js';

const router = express.Router();

// router.post('/register', register); 
router.post('/all', getnotifications);

export default router;