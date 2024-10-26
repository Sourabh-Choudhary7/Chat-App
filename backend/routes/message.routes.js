import { Router } from "express";
import isLoggedIn  from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { allMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.get('/:chatId', isLoggedIn, allMessages);
router.post('/', isLoggedIn, sendMessage);



export default router;