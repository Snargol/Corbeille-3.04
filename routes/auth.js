var express = require('express');
const res = require("express");
var router = express.Router();
const {createJWT, verifyJWT} = require('../modules/jwt')
const User =require('./schemas/user');
const currentUserName = 'Snargol';

// CREATE JWT
router.get('/create'), function(req, nes, next){
    let token = createJWT({name: req.params.name, role: 1});
    let refreshToken = createRefreshToken();
    res.json({token, refreshToken});
}

// CHECK JWT
router.get('/verify/:token'), function(req, nes, next){
    let check = verifyJWT(req.params.token);
    if (check === 'renew') {
        const user = getUser(currentUserName);
        let token = createJWT({name: user.name, role: user.role});
        let refreshToken = createRefreshToken();
        res.json({check, token, refreshToken})
    } else {
        res.json({check, token, refreshToken})
    }
    res.json(check);
}

const storeJWTInDB = function (name, jwt) {
    const filter = {name};
    const update = {jwt};
    User.findOneAndUpdate(filter, update)
        .then(User => console.log('JWT STORED FOR : ', User))
        .catch(error => console.log(error));
}

const getUser = async function (name) {
    let user;
    return user = await User.find({name})
        .then(User => console.log('GET : ', User))
        .catch(error => console.log(error));
}

function createRefreshToken() {
    const refreshToken = crypto.randomBytes(128).toString('base64');
    storeJWTInDB(currentUserName, refreshToken);
    return refreshToken;
}

module.exports = router;
