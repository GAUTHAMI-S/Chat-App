import express from 'express'
import { protectRoute } from '../middleware/Auth.js';
import { getMessage, getUsersForSidebar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getUsersForSidebar)
messageRouter.get('/:id', protectRoute, getMessage)
messageRouter.get('mark/:id', protectRoute, markMessageAsSeen)
messageRouter.post('/send/:id', protectRoute, sendMessage)
export default messageRouter;

