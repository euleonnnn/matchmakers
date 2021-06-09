const express = require ('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Chat = require('../../models/Chat');

router.post("/", [auth], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({errors: errors.array()});
    }

    const sender = await User.findById(req.user.id).select('-password');
    const receiver = await User.findById(req.body.receiver).select('-password');

    const newChat = new Chat({
        users: [req.user.id, req.body.receiver],
        names: [sender.name, receiver.name]
    });
    try {
        const savedChat = await newChat.save();
        res.json(savedChat);
    } catch (error) {
        res.status(500).send('Server error');
    }
})


//Get conversation
router.get("/", [auth], async (req,res) => {
    try {
        const chat = await Chat.find({
            users: { $in: [req.user.id]}
        });
        res.json(chat)
    } catch (error) {
        res.status(500).send('Server error');
    }
})



module.exports = router;
