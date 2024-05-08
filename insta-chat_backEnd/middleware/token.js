const jwt = require('jsonwebtoken')
require('dotenv').config()


const verify = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.userId
        next();
    });
}

module.exports = verify