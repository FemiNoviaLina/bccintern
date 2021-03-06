const router = require('express').Router()
const mentorController = require('../controllers/mentor.controller')
const joiMiddleware = require('../middlewares/joiValidators')
const jwtMiddleware = require('../middlewares/jwtAuth')

router.post('/add', joiMiddleware, mentorController.inputMentor)

router.get('/getById/:id', mentorController.viewMentor)

router.get('/showAll', mentorController.showAllMentor)

router.delete('/clearMentorDb', mentorController.clearAllMentor)

module.exports = router