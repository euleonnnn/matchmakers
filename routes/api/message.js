const express = require ('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Message= require('../../models/Message');

router.post("/:chatID", [auth], async (req, res) => {
    const sendername = await User.findById(req.user.id).select('-password');
    const newMessage = new Message ({
        chatID : req.params.chatID,
        sender : req.user.id,
        name: sendername.name,
        text : req.body.text,
        avatar: sendername.avatar
    })
    try {
        const savedMessage = await newMessage.save();
        res.json(savedMessage);
    } catch (error) {
        res.status(500).send('Server error');
    }
})

//get all messages in a chat

router.get("/:chatID", [auth], async(req,res) => {
    try {
        const messages = await Message.find({
            chatID: req.params.chatID
        })
        res.json(messages);
    } catch (error) {
        res.status(500).send('Server error');
    }
})



module.exports = router;
