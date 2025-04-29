const mongoose = require('mongoose');
const { Schema } = mongoose;

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



module.exports = Chat;