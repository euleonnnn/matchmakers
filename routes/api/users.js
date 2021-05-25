const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
//encrupt password
const jwt = require('jsonwebtoken');
const config = require('config');

const bcrypt = require('bcryptjs');

const { restart } = require('nodemon');

//bringing in User model
const User = require('../../models/User');


//@route POST api/register
//@desc Test route
//@access Public
router.post(
    '/', 
    [
        //following are checks to make sure the blanks filled in properly
        check('name', 'Name is required')
            .not()
            .isEmpty(),
            check('email','Please include a valid email').isEmail(),
            check('password','Please enter a password with 6 or more characters').isLength({min: 6})
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { name, email, password } = req.body;

    try {
        //see if user exists, check by email
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({errors: [ {msg: "User already exists"} ] });
        }

        //get users gravatar, pass the users email to get gravatar url

        const avatar = gravatar.url(email, {
            s: '200', //size
            r: 'pg', //rating 
            d: 'mm' //default - default icon
        })
        
        //create new instance of user
        user = new User ({
            name,
            email,
            avatar,
            password
        });
        //encrypt password through hashing

        //10 is the rounds, the more you have the more secured, see documentation
        //returns a promise, hence use await to return

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        const newUser = await user.save();
    
        //return jsonwebtoken - allows users to get logged in
        const payload = {
            user: {
                id: user.id //the main part of our payload will only contain user id which is like a long string of hashcode
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 360000},   //time taken for token to expire
            (err, token)=> {
                if(err) throw err;
                res.json({token, newUser});
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

  
});

//@route PUT api/users/:user_id/follow
//@desc Follow someone
//@access Private

router.put("/:user_id/follow", async (req, res) => {
    if (req.body.userId !== req.params.user_id) {
        try {
          const user = await User.findById(req.params.user_id);
          const currentUser = await User.findById(req.body.userId);
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.user_id } });
            res.status(200).json("Followed User");
          } else {
            res.status(403).json("User has already been followed");
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
        }
      } else {
        res.status(403).json("Unable to follow yourself");
      }
});

//@route PUT api/users/:user_id/unfollow
//@desc Unfollow someone
//@access Private

router.put("/:user_id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.user_id) {
      try {
        const targetUser = await User.findById(req.params.user_id);
        const currentUser = await User.findById(req.body.userId);
        if (targetUser.followers.includes(req.body.userId)) {
          await targetUser.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.user_id } });
          res.status(200).json("Unfollowed User");
        } else {
          res.status(403).json("You do not follow the user");
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
      }
    } else {
      res.status(403).json("Unable to follow yourself");
    }
});



//@route GET api/users/friends/:user_id
//@desc Get all friends of a particular user_id
//@access Private
router.get("/friends/:user_id", async (req, res) => {   
    try {
        const currUser = await User.findById(req.params.user_id);
        const allFriends = await Promise.all(
            currUser.followings.map(id => {
                return User.findById(id)
            })
        )
        let friendList = [];
        allFriends.map(friend => {
            const {_id, name, avatar} = friend;
            friendList.push({ _id, name, avatar}); 
        })
        res.status(200).json(friendList);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});




module.exports = router;