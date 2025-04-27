const express = require('express');
const router = express.Router();

const uiController = require('../controllers/uiController');

router.get('/dashboard', uiController.showDashboard);












module.exports = router;