import { Router } from "express";
import isLoggedIn  from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { addFriend, getAllUsers, getFriendsList, login, logout, register, updateProfile, viewProfile } from "../controllers/user.controller.js";

const router = Router();

router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.get('/me', isLoggedIn, viewProfile);
router.put('/update-profile', isLoggedIn,  upload.single("avatar"), updateProfile);
router.get('/logout', logout);

// API endpoints for friendship system
router.get('/all-users', isLoggedIn, getAllUsers);
router.post('/add-friend', isLoggedIn, addFriend);
router.get('/friends-list', isLoggedIn, getFriendsList);

export default router;