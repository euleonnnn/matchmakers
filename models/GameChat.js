const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const GameChatSchema = new Schema({
    users: {
        type: Array
    }
});

const GameChat = mongoose.model('gamechat', GameChatSchema);

module.exports = GameChat;