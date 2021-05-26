const mongoose = require('mongoose');


/**
 * The ProfileSchema will be a schema which maps to 
 * our MongoDB collection, where each key in the document
 * are the features of a profile. 
 * @param user Contains the user id 
 * @param faculty Home faculty of user
 * @param year Year of education eg. Year 1, Year 4
 * @param interests List of sports user is interested in 
 * @param bio Short write up for other users to see
 * @param social Contains the instagram and facebook field 
 * @param date Date when profile is established
 */

const ProfileSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    faculty: {
      type: String
    },
    year: {
      type: String,
      required: true
    },
    interests: {
      type: [String],
      required: true
    },
    bio: {
      type: String
    },
    social: {
      facebook: {
        type: String
      },
      instagram: {
        type: String
      }
    },
    date: {
      type: Date,
      default: Date.now
    }
});




const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;