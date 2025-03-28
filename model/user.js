const mongoose = require('mongoose');
const {Schema} = mongoose;

const USER_SCHEMA = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    bio:{
        about:{
            type:String,
            maxLength:50,
            minLength:5
        },
        date_updated:{
            type:Date,
            default:Date.now
        }
    },
    email:{
        type:String,
        trim:true,
        maxLength:30,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        trim:true,
        maxLength:13,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minLength:[6,"Password Should be of altleast 6 Characters"],
        required:true
    },
    profile_path:{
        type:String,
        default:'/profiles/default.png'
    },
    date_created:{
        type:Date,
        default:Date.now
    }
});

const User = mongoose.model('User',USER_SCHEMA);

module.exports = User;