// Imports
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Variables
const PORT = process.env.PORT || 9090;





async function startServer() {
    await connectDB()
    app.listen(PORT, () => {
        console.log("Server Listening on ", PORT, "PORT");
    });
}

startServer();
