var express = require('express');
var router = express.Router();
var crypto = require("crypto");
const {createJWT, checkJWT} = require('../modules/jwt')
const User = require('../schemas/users');
const currentUserName = 'Snargol';
const Commune = require('../schemas/communes');

// CREATE JWT
router.get('/create', (req, res, next) => {
    let token = createJWT({name: req.query.name, role: 1});
    let refreshToken = createRefreshToken();
    res.json({token, refreshToken});
});

// CHECK JWT
router.get('/verify', (req, res, next) => {
    let check = checkJWT(req.query.token);
    let token;
    let refreshToken;
    if (check === 'renew') {
        const user = getUser(currentUserName);
        token = createJWT({name: user.name, role: user.role});
        refreshToken = createRefreshToken();
        res.json({check, token, refreshToken})
    } else {
        res.json({check, token, refreshToken})
    }
});

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
