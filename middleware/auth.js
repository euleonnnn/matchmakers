const jwt = require('jsonwebtoken');
const config = require('config');
const { restart } = require('nodemon');

//this entire part allows us to authenticate users based on their token

module.exports = function(req, res, next) {
    //Get token from header from req object
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    //Verify token
    try {
        //decode token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
};