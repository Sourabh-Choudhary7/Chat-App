import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        account_active: {
            type: Boolean,
            default: true
        },
        userName: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [5, 'Name must be at least 5 characters'],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please fill in a valid email address',
            ], // Matches email against regex
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            unique: true,
            match: [
                /^[0-9]{10}$/, // Matches exactly 10 digits
                'Please enter a valid 10-digit phone number',
            ], // Matches phone number against regex
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false, // Will not select password upon looking up a document
        },
        avatar: {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        },
        twoFactorAuth: {
            type: Boolean,
            default: false,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',  // Referencing the User model to establish relationships between users
            }
        ],
        chats: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Chat'
            }
        ],
        otp: String,
        otpExpiry: Date,
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true,
    }
);

const User = model('User', userSchema);

export default User;