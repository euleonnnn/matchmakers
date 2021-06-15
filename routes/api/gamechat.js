const express = require ('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const GameChat = require('../../models/GameChat');

router.post("/", [auth], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({errors: errors.array()});
    }
    const newChat = new GameChat({
        users: [req.user.id, req.body.room]
    });
    try {
        const savedChat = await newChat.save();
        res.json(savedChat);
    } catch (error) {
        res.status(500).send('Server error');
    }
})


router.get('/:game_id',[auth], async (req,res) => {
    try {
        const gamechat = await GameChat.find({
            users: { $in: [req.params.game_id]}
        });
        res.json(gamechat)
    } catch (error) {
        res.status(500).send('Server error');
    }
})



module.exports = router;
