const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');


/**
 * @route GET api/auth is a Public @access route
 * that returns the response user if @param auth 
 * token is valid
 */

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Error in Server');
    }
});


/**
 * @route POST api/auth is a Public @access route
 * that respond with a unique token after validating the email
 * and password in the req body.
 */
router.post(
    '/', 
    [
        check('email','Invalid NUS Email').exists(),
        check('password','Password needs to have 6 or more characters').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if(!user) {
                return res
                    .status(400)
                    .json({errors: [ {msg: "Invalid credentials. Please make sure you used the correct NUS Email and Password"} ] });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);

                if(!isMatch) {
                    return res
                        .status(400)
                        .json({errors: [ {msg: "Invalid credentials. Please make sure you used the correct NUS Email and Password"} ] });
                }
            }
            
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
                    res.json({token});
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error in Server');
        }
    });

module.exports = router;