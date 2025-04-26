const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');



router.get('/register', authController.showRegisterPage);
router.get('/login', authController.showLoginPage);

router.post('/signin', authController.signIn);

router.post('/signup', upload.single('profile'), authController.signUp);





module.exports = router;
