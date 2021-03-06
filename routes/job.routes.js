const router = require('express').Router()
const jobController = require('../controllers/job.controller')
const joiMiddleware = require('../middlewares/joiValidators')
const jwtMiddleware = require('../middlewares/jwtAuth')

router.post('/create',jwtMiddleware, joiMiddleware, jobController.createJob)

router.get('/showAll', jobController.showAllJob)

router.get('/searchByCategory/:category', jobController.jobByCategory)

router.get('/searchBySalary/:minFee/:maxFee', jobController.jobBySalary)

router.get('/apply/:id', jwtMiddleware, jobController.applyJob)

router.get('/setWorker/:jobId/:userId', jwtMiddleware, jobController.setWorker)

router.delete('/clearJobDb', jobController.clearAllJobs)

router.use('/', (req, res) => {
    res.send({message: 'at job'})
})

module.exports = router