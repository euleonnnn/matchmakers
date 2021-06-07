const express = require ('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Game = require('../../models/Game');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route POST api/posts
//@desc Test route
//@access Public
router.post('/', [auth, 
    [
    check('sport', 'Sport is required').not().isEmpty()    
    ]
],  
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newGame = new Game({
                user: req.user.id,
                name: user.name,
                avatar: user.avatar,
                sport: req.body.sport,
                experience: req.body.experience, 
                dateTime: req.body.dateTime,
                maxPlayers: req.body.maxPlayers,
                location: req.body.location,
                otherLoc: req.body.otherLoc
            });

            const createdGame = await newGame.save();

            res.json(createdGame); 

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }   
    }
);

//@route GET api/posts
//@desc Get all posts 
//@access private

router.get('/', auth, async (req, res) => {
    try {
        const games = await Game.find().sort({ date: -1}); //most recent first 
        res.json(games);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


//@route GET api/posts/:id
//@desc Get post by ID
//@access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        
        if(!game) {
            return res.status(404).json({msg: 'Game not found'});
        }
        
        res.json(game);

    } catch (error) {
        console.error(err.message);

        if(err.kind === 'ObjectId') { //what was passed in is not a valid object id
            return res.status(404).json({msg: 'Game not found'});
        }

        res.status(500).send('Server Error');
    }
});


//@route DELETE api/posts
//@desc Delete a post 
//@access Private

router.delete('/:id', auth, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        if (!game) {
            return res.status(404).json({msg: 'Game not found'});
        }
        if (game.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorised'});
        }
        await game.remove();
        res.json({msg: 'Game Deleted'});
    } 
    
    catch (error) {
        console.error(err.message);
        if(err.kind === 'ObjectId') { 
            return res.status(404).json({msg: 'Game not found'});
        }
        res.status(500).send('Server Error');
    }
});


//@route PUT api/games/join/:id
//@desc Like a post 
//@access Private
router.put('/join/:id', auth, async(req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game.players.filter(joined =>  joined.user.toString() === req.user.id).length !== 0) {
            return res.status(400).json({msg: 'You have already joined the game'});
        }
        const user =  await User.findById(req.user.id).select('-password');
        const newPlayer = {
            user: req.user.id,
            name: user.name,
            avatar: user.avatar
        };
        game.players.unshift(newPlayer);
        await game.save();
        res.json(game.players);
    } catch (error) {
        console.error(error.message);
        res.status(500)
    }
})

router.put('/quit/:id', auth, async(req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game.players.filter(joined => joined.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: 'You have not joined the game'});
        }
        const removeIndex = game.players.map(joined => joined.user.toString()).indexOf(req.user.id);
        game.players.splice(removeIndex,1);
        await game.save();
        res.json(game.players);
    } catch (error) {
        console.error(error.message);
        res.status(500)
    }
})


// //@route POST api/posts/comment/:id
// //@desc Comment on a post
// //@access Private
// router.post('/comment/:id', [auth, 
//     [
//     check('text', 'Text is required').not().isEmpty()
//     ]
// ],  
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty) {
//             return res.status(400).json({errors: errors.array()});
//         }

//         try {
//             const user = await User.findById(req.user.id).select('-password');
//             const post = await Post.findById(req.params.id);

//             const newComment = {
//                 text: req.body.text,
//                 name: user.name,
//                 avatar: user.avatar,
//                 user: req.user.id
//             };

//             post.comments.unshift(newComment);

//             await post.save();

//             res.json(post.comments); 

//         } catch(err) {
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }   
//     }
// );

// //@route DELETE api/posts/comment/:id/:comment_id
// //@desc Delete comment
// //@access Private
// router.delete('/comment/:id/:comment_id', auth, async(req,res ) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         const comment = post.comments.find(comment => comment.id === req.params.comment_id);
//         if (!comment){
//             return res.status(404).json({msg: 'Comment does not exist'});
//         }

//         if (comment.user.toString() !== req.user.id) {
//             return res.status(401).json({msg : 'User not authorised'});
//         }

//         comment.remove();

//         await post.save();

//         res.json(post.comments);
        
//     } catch (error) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// })

module.exports = router;


