import { Router } from "express";
import isLoggedIn  from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { createGroupChat, exitGroup, fetchGroupsForLoggedInUser, getGroupChat, getOrCreateChat, makeGroupAdmin } from "../controllers/chat.controller.js";

const router = Router();

router.post('/one-to-one', isLoggedIn, getOrCreateChat);
router.post('/create-group', isLoggedIn, createGroupChat);
router.get('/group/:groupId', isLoggedIn, getGroupChat);
router.get('/get-groups', isLoggedIn, fetchGroupsForLoggedInUser);
router.post('/make-group-admin', isLoggedIn, makeGroupAdmin);
router.post('/exit-group', isLoggedIn, exitGroup);



export default router;