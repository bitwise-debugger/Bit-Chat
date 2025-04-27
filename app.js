// Imports
const express = require('express');
const app = express();
const engine = require('ejs-mate');
// Route Imports
const authRoutes = require('./routes/authRoutes');
const uiRoutes = require('./routes/uiRoutes');
const chatRoutes = require('./routes/chatRoutes');
// Middlware Imports
const errorHandler = require('./middlewares/errorHandler');

// Settings
app.set('view engine', 'ejs');
app.engine('ejs', engine);

// Middlwares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/user', authRoutes)
app.use('/ui', uiRoutes);
app.use('/chats', chatRoutes);


app.use(errorHandler);
module.exports = app;
