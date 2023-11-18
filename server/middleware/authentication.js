const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    try {
        const token = authHeader.split(" ")[1];
        const payLoad = jwt.verify(token, "jwtsecret")
        req.user = {
            userId: payLoad.userId,
            name: payLoad.name
        }
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = auth