// Imports
const mongoose = require('mongoose');


// Code
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection with Database Successfull !");
    } catch (error) {
        console.error("Connection with Database failed !");
        console.log(error);
        process.exit(1);
    }
}


// Exports
module.exports = main;