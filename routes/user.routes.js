const router = require('express').Router()
const userController = require('../controllers/user.controller')
const joiMiddleware = require('../middlewares/joiValidators')
const jwtMiddleware = require('../middlewares/jwtAuth')

router.post('/register', joiMiddleware, userController.registerUser)

router.post('/login', joiMiddleware, userController.loginUser)

router.delete('/cleardb', userController.clearAllUser)

module.exports = router