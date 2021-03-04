const router = require('express').Router()
const userController = require('../controllers/user.controller')
const joiMiddleware = require('../middlewares/joiValidators')
const jwtMiddleware = require('../middlewares/jwtAuth')

router.post('/register', joiMiddleware, userController.registerUser)

router.post('/login', joiMiddleware, userController.loginUser)

router.get('/getUser/:id', jwtMiddleware, userController.showUserById)

router.delete('/clearUserDb', userController.clearAllUser)

module.exports = router