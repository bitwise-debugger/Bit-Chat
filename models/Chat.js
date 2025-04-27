const mongoose = require('mongoose');
const { Schema } = mongoose;
const faker = require('@faker-js/faker');

const chatSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        trim: true,
        minLength: [1, 'Minimum message length : 1'],
        required: true,
    }
}, { timestamps: true });
const Chat = mongoose.model('Chat', chatSchema);



async function seedChats() {
    let chats = [];

    for (let i = 0; i < 10; i++) {
        chats.push({
            sender: new mongoose.Types.ObjectId(),
            receiver: new mongoose.Types.ObjectId(),  // Remember you fixed spelling to receiver
            message: faker.lorem.sentence(), // Random sentence like: "Hello, how's your day?"
        });
    }

    await Chat.insertMany(chats);
    console.log('Dummy chats inserted!');
}

seedChats();

module.exports = Chat;