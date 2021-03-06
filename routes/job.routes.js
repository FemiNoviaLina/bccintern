const router = require('express').Router()
const jobController = require('../controllers/job.controller')
const joiMiddleware = require('../middlewares/joiValidators')
const jwtMiddleware = require('../middlewares/jwtAuth')

router.post('/create',jwtMiddleware, joiMiddleware, jobController.createJob)

router.get('/showAll', jwtMiddleware, jobController.showAllJob)

router.get('/searchByCategory/:category', jwtMiddleware, jobController.jobByCategory)

router.get('/searchBySalary/:minFee/:maxFee', jwtMiddleware, jobController.jobBySalary)

router.get('/take/:id', jwtMiddleware, jobController.getJob)

router.delete('/clearJobDb', jobController.clearAllJobs)

router.use('/', (req, res) => {
    res.send({message: 'at job'})
})

module.exports = router