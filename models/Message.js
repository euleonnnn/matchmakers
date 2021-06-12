const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    chatID: {
        type: String
    },
    sender:{
        type: String
    },
    text: {
        type: String
    }
}, {timestamps:true});

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;