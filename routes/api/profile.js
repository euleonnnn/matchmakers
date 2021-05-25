const express = require ('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');


const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@desc Get current users profile
//@access Private

router.get('/me', auth, async (req, res) => {
    try {
        //bring in the array of name and avatar from the keyword user. Hence we specified we want to see the user object 
        //with the name and avatar in the UI
        const profile = await Profile.findOne({user: req.user.id}).populate('user',
        ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }
        res.json(profile);  

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route POST api/profile
//@desc Create or update user profile
//@access Private
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
        twitter,
        instagram,
        linkedin
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
      
      //Build social object
      profileFields.social = {};
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;

      try {
        let profile = await Profile.findOne({user: req.user.id});
        
        if (profile) {
            //update 
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },  //find by user
                { $set: profileFields }, //set the profile fields
                { new: true} 
            );

            return res.json(profile);
        }

        //Create (if not found)
        profile = new Profile(profileFields);
        await profile.save(); //save
        res.json(profile); //send back the profile

      } catch(err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
}); 

  
//@route GET api/profile
//@desc Get all profiles
//@access Public

router.get('/', async (req,res) => {
    try {
        //include the user name and avatar in the profile we retrieve
        //note that the profile will include other things like experience, company etc.
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);  
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route GET api/profile/user/:user_id
//@desc Get profile by user ID
//@access Public

//colon used for placeholder value
router.get('/user/:user_id', async (req,res) => {
    try {
        //include the user name and avatar in the profile we retrieve
        //note that the profile will include other things like experience, company etc.
        //notice we use req.params.user_id, param meaning the user id is typed tgt with url

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
        res.status(500).send('Server Error');
    }
})

//@route DELETE api/profile
//@desc Delete profile, user & posts
//@access Private

router.delete('/', auth, async (req,res) => {
    try {
        //remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //remove user
        await User.findOneAndRemove({ _id: req.user.id});

        res.json({msg: 'User deleted'});  

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route PUT api/profile/experience
//@desc Add profile experiience (editing upon existing profile)
//@access Private

router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
    ]
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } 

    //pull these things out from req.body
    const {
        title,
        company,
        location,
        from,
        to, 
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company, 
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp); //push new exp to the beginning rather than the end of arr
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



//@route DELETE api/profile/experience/:exp_id
//@desc 
//@access Private
router.delete('/experience/:exp_id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        //get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        //remove one element at the indx removeIndex
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


//@route PUT api/profile/education
//@desc Add profile education (editing upon existing profile)
//@access Private

router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
    ]
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } 

    //pull these things out from req.body
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to, 
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newEdu); //push new exp to the beginning rather than the end of arr
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



//@route DELETE api/profile/education/:edu_id
//@desc Delete education from profile
//@access Private
router.delete('/education/:edu_id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        //get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        //remove one element at the indx removeIndex
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router;