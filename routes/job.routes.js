const router = require('express').Router()
const jobController = require('../controllers/job.controller')
const joiMiddleware = require('../middlewares/joiValidators')
const jwtMiddleware = require('../middlewares/jwtAuth')

router.post('/create',jwtMiddleware, jobController.createJob)

router.get('/searchByCategory/:category', jwtMiddleware, jobController.jobByCategory)

router.post('/searchBySalary', jwtMiddleware, jobController.jobBySalary)

router.get('/takeJob/:id', jwtMiddleware, jobController.takeJob)

router.delete('/clearJobDb', jobController.clearAllJobs)

router.use('/', (req, res) => {
    res.send({message: 'at job'})
})

module.exports = router