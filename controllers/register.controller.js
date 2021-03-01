const db = require('../models')
const User = db.users
const jwt = require('jsonwebtoken')

function registerUser(req, res, next) {
    User.create(req.body)
        .then(data => {
            let payload = {
                id: data.id,
                username: data.username,
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN)
            req.session.loggedin = true
            req.session.username = data.username
            res.status(200).send({data, token})
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {
    registerUser
}