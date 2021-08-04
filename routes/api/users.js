const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { restart } = require('nodemon');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Game = require('../../models/Game');

/**
 * @route POST api/users is a public @access route
 * that allows any client to register a user account
 * that fits requirements 
 */
router.post(
    '/', 
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
            check('email','Please include a valid NUS email').isEmail(),
            check('password','Please enter a password with 7 or more characters').isLength({min: 7})
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({errors: [ {msg: "The email is already registered"} ] });
        }

        const avatar = gravatar.url(email, {
            s: '200', 
            r: 'pg', 
            d: 'mm'
        })
        
        user = new User ({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(5);

        user.password = await bcrypt.hash(password, salt);

        const newUser = await user.save();
    
        const payload = {
            user: {
                id: user.id 
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 3600000},   
            (err, token)=> {
                if(err) throw err;
                res.json({token, newUser});
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/password', 
  [auth], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { password } = req.body;

    try { 
        const user = await User.findOneAndUpdate(
          { user : req.user._id }, 
          { password: password },
          { new: true }
        );
        
        const salt = await bcrypt.genSalt(5);

        user.password = await bcrypt.hash(password, salt);
          
        const newUser = await user.save();

        const payload = {
            user: {
                id: user.id 
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 3600000},   
            (err, token)=> {
                if(err) throw err;
                res.json({token, newUser});
            });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  });





/**
 * @route PUT api/users/:user_id/follow is an @access 
 * route that allows a user to add another user in the
 * given html param as a friend
 */
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


/**
 * @route PUT api/users/:user_id/unfollow is an @access 
 * route that allows a user to remove another user in the
 * given html param as a friend
 */
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


/**
 * @route PUT api/users/:user_id/follow is an @access 
 * route that allows a user to add another user in the
 * given html param as a friend
 */
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


router.put("/:user_id/invite", async (req, res) => {
  if (req.body.userId !== req.params.user_id) {
      try {
        const user = await User.findById(req.params.user_id); //invite target
        const currentUser = await User.findById(req.body.userId).select('-password');
        const newInvite = {
            user: req.body.userId, //invite origin id
            username: currentUser.name, //invite origin
            game: req.body.gameId
        }
        if (user.invitations.filter(invite =>  invite.game.toString() === req.body.gameId).length !== 0) {
          return res.status(400).json({msg: 'This person is already invited to the activity'});
        }
        user.invitations.unshift(newInvite)
        await user.save()
        res.status(200).json("Invited User");
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    } else {
      res.status(403).json("Unable to invite yourself");
    }
});


router.put("/:user_id/uninvite", async (req, res) => {
  if (req.body.userId !== req.params.user_id) {
      try {
        const user = await User.findById(req.params.user_id);
        if (user.invitations.filter(joined => joined.user.toString() === req.body.userId).length === 0) {
          return res.status(400).json({msg: 'You have not invited this player'});
        }
        const removeIndex = user.invitations.map(invited => invited.user.toString()).indexOf(req.body.userId);
        user.invitations.splice(removeIndex,1);
        await user.save()
        res.status(200).json("Uninvited User");
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    } else {
      res.status(403).json("Unable to uninvite yourself");
    }
});


router.get("/invitations/:user_id", async (req, res) => {   
  try {
      const currUser = await User.findById(req.params.user_id);
      const invites = currUser.invitations
      
      const allGames = await Promise.all(
          invites.map(obj => {
              return Game.findById(obj.game);
          })
      )

      const allInvite = await Promise.all(
        invites.map(obj => {
            return User.findById(obj.user);
        })
      )

      let gameList = [];
      allGames.map(game => {
          const {_id, name, sport, location, dateTime, experience} = game;
          gameList.push({ _id, name, sport, location, dateTime, experience}); 
      })
      let count = 0;
      gameList.map(game =>{
        game.name = allInvite[count].name;
        count += 1;
      })
      res.status(200).json(gameList);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
  }
});


/**
 * @route GET api/users/friends/user_id is an @access 
 * route that allows a user to get the friends of a 
 * particular user_id as in the html param
 */
router.get("/friends/:user_id", async (req, res) => {   
    try {
        const currUser = await User.findById(req.params.user_id);
        const friends = currUser.followings.filter(id => currUser.followers.find(follower => id === follower) !== undefined);
        const allFriends = await Promise.all(
            friends.map(id => {
                return User.findById(id);
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







/**
 * @route GET api/users/friends/user_id is an @access 
 * route that allows a user to get the friends of a 
 * particular user_id as in the html param
 */
 router.get("/followers/:user_id", async (req, res) => {   
  try {
      const currUser = await User.findById(req.params.user_id);
      const followers = currUser.followers;
      const allFollowers = await Promise.all(
          followers.map(id => {
              return User.findById(id);
          })
      )
      let followerList = [];
      allFollowers.map(follower => {
          const {_id, name, avatar} = follower;
          followerList.push({ _id, name, avatar}); 
      })
      res.status(200).json(followerList);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
  }
});




module.exports = router;