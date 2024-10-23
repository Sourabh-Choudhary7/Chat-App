import User from '../models/user.model.js';
import Cloudinary from 'cloudinary';
import fs from 'fs/promises';
import crypto from 'crypto';
import AppError from '../utils/error.utils.js';
import { generateJWTToken, hashPassword } from '../utils/auth.utils.js';

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
}

const register = async (req, res, next) => {
    try {
        const { userName, email, phone, password } = req.body;

        if (!userName || !email || !phone || !password) {
            return next(new AppError('All fields are required', 400));
        }

        const userEmailExists = await User.findOne({ email });
        const userPhoneExists = await User.findOne({ phone });

        if (userEmailExists || userPhoneExists) {
            return next(new AppError('Email or phone already exists', 409));
        }

        // Hashing password
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            userName,
            email,
            phone,
            password: hashedPassword,
            avatar: {
                public_id: null,
                secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
            },
        })

        // If user not created send message response
        if (!user) {
            return next(new AppError('Failed to register user, please try again later', 400));
        }

        // Run only if user sends a file
        // console.log("file: ", JSON.stringify(req.file));
        if (req.file) {
            try {
                const result = await Cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'profile',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill',
                });

                // If success
                if (result) {
                    // Set the public_id and secure_url in DB
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    // After successful upload remove the file from local storage
                    fs.rm(`uploads/${req.file.filename}`);
                }
            } catch (error) {
                return next(
                    new AppError(error || 'File not uploaded, please try again', 400)
                );
            }
        }

        // save the user object in db and generate token
        await user.save();
        const token = await generateJWTToken(user._id);

        // Setting the password to undefined so it does not get sent in the response
        user.password = undefined;

        // Setting the token in the cookie with name token along with cookieOptions
        res.cookie('token', token, cookieOptions);
        // If all good send the response to the frontend
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const login = async (req, res, next) => {
    try {
        
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const viewProfile = async (req, res, next) => {
    try {

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const updateProfile = async (req, res, next) => {
    try {

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const logout = async (req, res, next) => {
    try {

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

export {
    register,
    login,
    viewProfile,
    updateProfile,
    logout,
}