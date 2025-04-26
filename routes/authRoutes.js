const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');


router.get('/register', authController.showRegisterPage);
router.get('/login', authController.showLoginPage);

router.post('/signin', (req, res) => {
    let { email, password } = req.body;
    console.log(email, password);

    res.render('pages/index');
});

router.post('/signup',upload.single('profile'), (req, res) => {

});





module.exports = router;
