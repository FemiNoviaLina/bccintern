const router = require('express').Router()
const mentorController = require('../controllers/mentor.controller')
const joiMiddleware = require('../middlewares/joiValidators')
const jwtMiddleware = require('../middlewares/jwtAuth')

router.post('/addMentor/', mentorController.inputMentor)

router.get('/viewMentor/:id', jwtMiddleware, mentorController.viewMentor)

router.get('/showAllMentor', mentorController.showAllMentor)

router.delete('/clearMentorDb', mentorController.clearAllMentor)

module.exports = router