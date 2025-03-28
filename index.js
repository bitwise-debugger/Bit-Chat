// Imports
const mongoose = require('mongoose');
const User = require('./model/user.js');
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

const multer = require('multer');
// Application Settings
app.use(session({
    secret: 'bp2592',
    resave: false,
    saveUninitialized: true,
    // cookie:{secure:false},
}));
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Multer Settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profiles/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png/; // Allowed file types
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg format allowed!'));
        }
    }
});
// Database Connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/bitchat');
}
main().then(() => {
    console.log('Connection Succeed with DB');
}).catch((error) => {
    console.error('❌ Error Connecting DB:', error);
    process.exit(1);
})
// Routes
app.get('/', (req, res) => {
    res.render('login');
});
app.get('/reg', (req, res) => {
    res.render('register');
});

app.post('/register', upload.single('image'), async (req, res) => {
    let { name, email, mobile, password } = req.body;
    let profile_path;
    if (req.file) {
        profile_path = `/profiles/${req.file.filename}`;
    } else {
        profile_path = `/profiles/default.png`;
        return res.status(400).json({ success: false, message: "Upload a DP" });
    }
    if (!name || !email || !mobile || !password) {
        return res.status(400).send("All fields are required!");
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Improve Password, Altleast 6 Characters" });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already exists!" });
    }
    existingUser = await User.findOne({ mobile });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Phone Number already exists!" });
    }
    const USER = new User({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        profile_path: profile_path,
    });
    try {
        await USER.save();
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ success: false, message: err.message.split(':')[2].trim() });
    }
    res.status(200).json({ success: true, message: 'Registeration Successfull' });
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let foundUser = await User.findOne({ email });
    console.log(email, password);
    console.log(foundUser);

    if (!foundUser) {
        return res.status(400).json({ success: false, message: 'Account not found!' })
    } else {
        if (foundUser.password == password) {
            req.session.user = {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                profile_path: foundUser.profile_path
            };
            res.status(200).json({ success: true, message: 'Login Success' });
        } else {
            return res.status(400).json({ success: false, message: 'Wrong Password!' })
        }
    }
});
app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('index', { USER: req.session.user });
    } else {
        return res.redirect('/');
    }
});
app.listen(process.env.PORT, () => {
    console.log('Server Running on Port', process.env.PORT);
});
