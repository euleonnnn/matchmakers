const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'user' // link post to User model, allows us to later populate all the posts by User that has 
        //same ID as ObjectID provided 
    },
    text : {
        type: String,
        required: true
    }, 
    name : {
        type: String
    },
    avatar : {
        type: String, 
    },
    //array of likes
    likes : [
        {
            user: {
                type: Schema.Types.ObjectId,   //one user can only give one like
                ref: 'user'
            }
        }
    ], 
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,   //one user can only give one like
                ref: 'user'
            },
            text: {
                type: String,
                required: false
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
    //date of the actual post
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;