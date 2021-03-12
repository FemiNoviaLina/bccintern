const router = require('express').Router()
const jobController = require('../controllers/job.controller')
const joiMiddleware = require('../middlewares/joiValidators')
const jwtMiddleware = require('../middlewares/jwtAuth')
const multerMiddleware = require('../middlewares/multer')

router.post('/create',jwtMiddleware, multerMiddleware, joiMiddleware, jobController.createJob)

router.get('/showAll', jobController.showAllJob)

router.get('/search/:key', jobController.searchJob)

router.get('/searchByCategory/:category', jobController.jobByCategory)

router.get('/searchBySalary/:minFee/:maxFee', jobController.jobBySalary)

router.get('/searchByLocation/:location', jobController.jobByLocation)

router.post('/allFilter', jobController.allFilter)

router.put('/apply/:id', jwtMiddleware, jobController.applyJob)

router.get('/allJobByUser/:userId', jobController.allJobByUser)

router.get('/viewApplier/:id', jobController.viewApplier)

router.put('/setWorker/:jobId/:userId', jwtMiddleware, jobController.setWorker)

router.get('/history/:id', jobController.jobDoneByUser)

router.delete('/clearJobDb', jobController.clearAllJobs)

router.use('/', (req, res) => {
    res.send({message: 'at job'})
})

module.exports = router