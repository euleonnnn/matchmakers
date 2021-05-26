const mongoose = require('mongoose');

/**
 * The UserSchema will be a schema which maps to 
 * our MongoDB collection, where each key in the document
 * are the features of a user. 
 * @param name Full name of the user
 * @param email Full NUS Email address of user, must be unique
 * @param password Password of user, min 7 characters
 * @param avatar Link to profile picture
 * @param date Date user created
 * @param followers List of users followed by
 * @param following List of users currently following, also known as friends
 */

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