const jwt = require('jsonwebtoken');

const createJWT = (user) => {
    // console.log('env : ', process.env.VUE_APP_JWT_SECRET);
    const token  = jwt.sign({
        user: user
    }, "phrase secrète", {expiresIn: '1h'})

    return token;
}

const checkJWT = (token) => {
    let check = false;

    try {
        check = jwt.verify(token,"phrase secrète");
    } catch(err) {
        if (err.name === 'TokenExpiredError'){
            check = 'renew';
        } else {
            check = false;
        }
    }
    return check;
}

module.exports = {createJWT, checkJWT}
