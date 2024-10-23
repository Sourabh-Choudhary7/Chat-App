import User from '../models/user.model.js';
import Cloudinary from 'cloudinary';
import fs from 'fs/promises';
import crypto from 'crypto';
import AppError from '../utils/error.utils.js';
import { comparePassword, generateJWTToken, hashPassword } from '../utils/auth.utils.js';

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
}

const register = async (req, res, next) => {
    try {
        const { userName, email, phone, password } = req.body;
        console.log("phone: ", phone);
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
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Email and password are required', 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return next(new AppError('Invalid user id or user does not exist', 404));
        }

        // check if user's account is active or not
        if (!user.account_active) {
            return next(new AppError('Your Account is deactivated. Please contact support.', 403));
        }

        if (!(user && (await comparePassword(password, user.password)))) {
            return next(new AppError('Email or Password do not match or user does not exist', 401));
        }

        // generate JWT token
        const token = await generateJWTToken(user._id);
        user.password = undefined;
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const viewProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const { userName } = req.body;
        const { id } = req.user;

        const user = await User.findById(id)

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        if (userName) {
            user.userName = userName;
        }

        // Run only if user update his avatar
        if (req.file) {
            // Deletes the old image uploaded by the user
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms', // Save files in a folder named lms
                    width: 250,
                    height: 250,
                    gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
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

        await user.save();

        res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const logout = async (req, res, next) => {
    try {
        res.cookie('token'), null, {
            secure: true,
            maxAge: 0,
            httpOnly: true,
        }

        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });
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