const jwt = require('jsonwebtoken');
require('dotenv').config()
let signJwt = function (payload) {
    return jwt.sign(
        payload,
        process.env.SECRET_TOKEN,

    )
}

// const maxAge = 60 * 60 * 24;


module.exports = signJwt