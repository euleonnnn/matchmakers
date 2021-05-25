const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;