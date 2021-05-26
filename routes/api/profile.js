const express = require ('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');


const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * @route GET api/profile/me is a private @access route
 * that returns the response profile of the logged-in user
 * who will be uniquely identified by the @param auth token
 * if valid
 */
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'This user does not have a profile yet'});
        }
        res.json(profile);  

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error In Server');
    }
});



/**
 * @route POST api/profile is a private @access route
 * that enables a logged in user uniquely identified by @param auth 
 * to create profile (if haven't) or update existing profile
 */
router.post(
    '/',
    [auth,
        [
        check('interests', 'Interests field should not be blank').not().isEmpty(),
        check('faculty', 'Faculty field should not be blank').not().isEmpty(),
        ]    
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        faculty,
        year,
        interests,
        bio,
        facebook,
        instagram      
    } = req.body;
      
      const profileFields = {};
      profileFields.user = req.user.id;
      if (faculty) profileFields.faculty = faculty;
      if (year) profileFields.year = year;
      if (bio) profileFields.bio = bio;
      if (Array.isArray(interests)) {
        profileFields.interests = interests;
      } else {
        profileFields.interests = interests.split(',').map(int => int.trim());
      }
      
      profileFields.social = {};
      if (facebook) profileFields.social.facebook = facebook;
      if (instagram) profileFields.social.instagram = instagram;

      try {
        let profile = await Profile.findOne({user: req.user.id});
        
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },  
                { $set: profileFields },
                { new: true} 
            );

            return res.json(profile);
        }

        profile = new Profile(profileFields);
        await profile.save(); 
        res.json(profile); 
      } catch(err) {
          console.error(err.message);
          res.status(500).send('Error in Server');
      }
}); 

  

/**
 * @route GET api/profile is a public @access route
 * that returns all the user profiles on the database
 */
router.get('/', async (req,res) => {
    try {
        //include the user name and avatar in the profile we retrieve
        //note that the profile will include other things like experience, company etc.
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);  
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error In Server');
    }
})


/**
 * @route GET api/profile is a public @access route
 * that returns all the user profile of a specified 
 * user_id in the html param
 */
router.get('/user/:user_id', async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        
        if (!profile) {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.json(profile);  

    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Error in Server');
    }
})



/**
 * @route DELETE api/profile is a private @access route
 * that allows a logged in user uniquely identified by 
 * @param auth token to be deleted off the database 
 */
router.delete('/', auth, async (req,res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id});
        res.json({msg: 'User deleted'});  

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;