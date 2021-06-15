const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    avatar: {
        type: String
    },
    chatID: {
        type: String
    },
    sender:{
        type: String
    },
    name:{
        type: String
    },
    text: {
        type: String
    }
}, {timestamps:true});

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;