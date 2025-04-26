const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    number: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        match: [/^\d{10,15}$/, 'Please fill a valid phone number']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    profile_path: {
        type: String,
        default: '/images/default.png'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
