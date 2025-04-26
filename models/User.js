const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        required: [true, 'Name is Required'],
    },
    number: {
        type: String,
        minlength: [9, 'Phone Number should be of atleast 9 digits'],
        maxlength: [15, `Phone Number shouldn't be of more than 15 digits`],
        unique: [true, 'Phone Number already exists'],
        required: [true, 'Phone Number is Required'],
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        trim: true,
        lowercase: true,
        required: [true, 'Email is Required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 8 characters'],
    },
    profile_path: {
        type: String,
        default: 'uploads/default.png',
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

