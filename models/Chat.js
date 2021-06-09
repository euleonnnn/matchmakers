const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    users: {
        type: Array
    },
    names: {
        type: Array
    }

});

const Chat = mongoose.model('chat', ChatSchema);

module.exports = Chat;