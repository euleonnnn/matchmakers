const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'user' // link post to User model, allows us to later populate all the posts by User that has 
        //same ID as ObjectID provided 
    },
    sport : {
        type: String,
        required: true
    }, 

    dateTime : {
        type: Date,
        default: Date.now
    },

    createTime : {
        type: Date,
        default: Date.now
    },

    experience : {
        type: String,
        required: true
    },

    maxPlayers : {
        type: Number,
        required: true
    },

    location: {
        type: String, 
        required: true
    },

    otherLoc: {
        type: String
    },

    name : {
        type: String
    },
    avatar : {
        type: String, 
    },

    players: [
        {
            user: {
                type: Schema.Types.ObjectId,   //one user can only give one like
                ref: 'user'
            },
            name : {
                type: String
            },
            avatar : {
                type: String, 
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;