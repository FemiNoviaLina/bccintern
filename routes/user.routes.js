const router = require('express').Router()
const userController = require('../controllers/user.controller')
const joiMiddleware = require('../middlewares/joiValidators')
const jwtMiddleware = require('../middlewares/jwtAuth')
const multerMiddleware = require('../middlewares/multer')

router.post('/register', joiMiddleware, userController.registerUser)

router.post('/login', joiMiddleware, userController.loginUser)

router.get('/getById/:id', userController.showUserById)

router.put('/addPhoto/:id', multerMiddleware, userController.addPhoto)

module.exports = router