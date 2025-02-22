import express from 'express'; 
import {create,update,getpost} from '../controllers/post.controller.js'

const router = express.Router();

router.post('/create', create);
router.put('/update',update);
router.get('/seepost',getpost);
// router.post('/login', login);

export default router;