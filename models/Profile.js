const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId, //profile should be associated with user id of a user
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