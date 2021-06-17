const {checkJWT} = require('../modules/jwt.js')

const checkRequestRight = (req, res, next, app) => {
    let token = req.headers.authorization;
    token = token.replace(/^Bearer\s+/, "");
    if (token) {
        const verif = checkJWT(token);
        if (!verif) {
            console.log("Token is not valid");
            return res.status(500).json({
                success: false,
                message: 'Token is not valid'
            });
        } else {
            console.log("Token is valid");
            app.set("userId", verif.user._id);
            next();
        }
    } else {
        console.log("Token not provided");
        return res.status(500).json({
            success: false,
            message: 'Token not provided'
        })
    }
}

module.exports = {checkRequestRight}
