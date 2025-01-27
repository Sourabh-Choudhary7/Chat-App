import { Router } from "express";
import isLoggedIn  from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { createChat, createGroupChat, dismmissAsGroupAdmin, exitGroup, fetchGroupsForLoggedInUser, getAllChats, getGroupChat, makeGroupAdmin } from "../controllers/chat.controller.js";

const router = Router();

router.get('/', isLoggedIn, getAllChats);
router.post('/create', isLoggedIn, createChat);
router.post('/create-group', isLoggedIn, createGroupChat);
router.get('/group/:groupId', isLoggedIn, getGroupChat);
router.get('/get-groups', isLoggedIn, fetchGroupsForLoggedInUser);
router.post('/make-group-admin', isLoggedIn, makeGroupAdmin);
router.post('/dismiss-as-admin', isLoggedIn, dismmissAsGroupAdmin);
router.post('/exit-group', isLoggedIn, exitGroup);



export default router;