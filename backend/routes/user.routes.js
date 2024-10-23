import { Router } from "express";
import isLoggedIn  from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { login, logout, register, updateProfile, viewProfile } from "../controllers/user.controller.js";

const router = Router();

router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.get('/me', isLoggedIn, viewProfile);
router.put('/update-profile', isLoggedIn, updateProfile);
router.get('/logout', isLoggedIn, logout);

export default router;