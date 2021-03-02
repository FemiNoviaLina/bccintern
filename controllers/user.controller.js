const db = require('../models')
const User = db.users
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function registerUser(req, res, next) {
    User.create(req.body)
        .then(data => {
            let payload = {
                id: data.id,
                username: data.username,
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN)
            res.status(200).send({data, token})
        })
        .catch(err => {
            next(err)
        })
}

function loginUser(req, res, next) {
    if(req.body.username) {
        User.findOne({
            where: {
                username: req.body.username, 
            }
        })
            .then(data => {
                if(bcrypt.compareSync(req.body.password, data.password)) {
                    let payload = {
                        id: data.id,
                        username: data.username,
                    }
                    const token = jwt.sign(payload, process.env.JWT_TOKEN)
                    res.status(200).send({data, token})
                } else {
                    next({statusCode: 400, message: 'Wrong password'})
                }
            })
            .catch(err => {
                next("Username not found")
            })
    } else {
        res.send('Please enter Username and Password!');
    }
}

function clearAllUser(req, res, next) {
    User.destroy({truncate: true})
        .then(resolved => {
            res.status(200).send({
                message: `cleared successfully`
            })
        })
        .catch(reject => {
            next('cannot clear')
        })
}

module.exports = {
    registerUser,
    loginUser,
    clearAllUser
}