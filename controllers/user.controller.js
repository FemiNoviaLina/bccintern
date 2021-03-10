const db = require('../models')
const User = db.users
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function registerUser(req, res, next) {
    User.create(req.body)
        .then(userData => {
            let payload = {
                id: userData.id,
                username: userData.username
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN)
            res.status(200).send({
                message: 'Register success',
                status: 'success',
                data: {
                    userData, 
                    token
                }
            })
        })
        .catch(err => {
            if(err.message == 'Validation error') next('email or username already used by another account / invalid input format')
            else next(err)
        })
}

function loginUser(req, res, next) {
    if(req.body.username) {
        User.findOne({
            where: {
                username: req.body.username, 
            }
        })
            .then(userData => {
                if(bcrypt.compareSync(req.body.password, userData.password)) {
                    let payload = {
                        id: userData.id,
                        username: userData.username,
                    }
                    const token = jwt.sign(payload, process.env.JWT_TOKEN)
                    res.status(200).send({
                        message: 'Login success',
                        status: 'success',
                        data: {
                            userData,
                            token
                        }
                    })
                } else {
                    next('Wrong password')
                }
            })
            .catch(err => {
                next("Username not found")
            })
    } else {
        res.send('Please enter Username and Password!');
    }
}

function showUserById(req, res, next) {
    User.findByPk(req.params.id)
        .then(userData => {
            if(userData != null) res.status(200).send({
                message: `Showing user with id: ${req.params.id}`,
                status: 'success',
                data: {
                    userData
                }
            })
            else next('User not found')
        })
        .catch(err => {
            next(err)
        })
}

function clearAllUser(req, res, next) {
    User.destroy({where:{}})
        .then(resolved => {
            res.status(200).send({
                message: `${resolved} row cleared successfully`,
                status: 'success',
                data: {}
            })
        })
        .catch(reject => {
            next(reject)
        })
}

module.exports = {
    registerUser,
    loginUser,
    showUserById,
    clearAllUser
}