const User = require('../models/User');
const bcrypt = require('bcrypt');
module.exports.showLoginPage = (req, res) => {
    res.render('pages/login', { title: 'BitChat - Login' });
}
module.exports.showRegisterPage = (req, res) => {
    res.render('pages/register', { title: 'BitChat - Signup' });
}
module.exports.signIn = async (req, res) => {

    let { email, password } = req.body;
    if(!email){
        throw new Error()
    }
    if(!password){

    }
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ status: 400, message: 'User not found', success: false });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        return res.status(400).json({ status: 400, message: 'Wrong Password', success: false });
    }
    res.status(200).json({ status: 200, message: 'Login Success', success: true });
}
module.exports.signUp = async (req, res) => {
    let { fullname, email, number, password } = req.body;
    let profile_path = req.file ? req.file.path : process.env.DEFAULT_PROFILE_PATH;
    let hashed_password = await bcrypt.hash(password, 10);
    try {
        let user = new User({ fullname, email, number, password: hashed_password, profile_path });
        await user.save();
        res.send({ message: 'User Added' });
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message, success: false });
    }
}