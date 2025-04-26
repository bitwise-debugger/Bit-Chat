// Imports
const express = require('express');
const app = express();
// Route Imports
const authRoutes = require('./routes/authRoutes');

// Settings
app.set('view engine', 'ejs');

// Middlwares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/user', authRoutes)



module.exports = app;
