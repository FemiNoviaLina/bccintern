const { Op } = require("sequelize");
const db = require('../models');
const Job = db.jobs
const User = db.users
const user_job = db.user_job

function createJob(req, res, next) {
    console.log(req.user.id)
    Job.create(req.body) 
        .then(data => {
            data.createdById = req.user.id
            data.save({ fields: ['createdById']})
            res.status(200).send({
                message: 'Job created successfully',
                status: 'success',
                data: data
            })
        })
        .catch(err => {
            if(err.message == 'Validation error') next('invalid request format')
            else next(err)
        })
}

function showAllJob(req, res, next) {
    Job.findAll({})
        .then(data => {
            res.status(200).send({
                message: `Showing ${data.length} job(s)`,
                status: 'success',
                data: data
            })
        .catch(err => {
            next(err)
        })
    })
}

function jobByCategory(req, res, next) {
    Job.findAll({where: 
        {
        category: req.params.category
        }
    })
        .then(data => {
            res.status(200).send({
                message: `Showing ${data.length} job(s) match ${req.params.category} category`,
                status: 'success',
                data: data
            })
        })
        .catch(err => {
            next(err)
        })
}

function jobBySalary(req, res, next) {
    Job.findAll({where: {
        fee: {
            [Op.between] : [req.params.minFee, req.params.maxFee]
        }
    }})
        .then(data => {
            res.status(200).send({
                message: `Showing ${data.length} job(s) in range ${req.params.minFee} - ${req.params.maxFee}`,
                status: 'success',
                data: data
            })
        })
        .catch(err => {
            next(err)
        })
}

function applyJob(req, res, next) {
    user_job.create({
        userId: req.user.id,
        jobId: req.params.id
    })
        .then(data => {
            User.findByPk(data.userId)
                .then(userData => {
                    Job.findByPk(data.jobId)
                        .then(jobData => {
                            res.status(200).send({
                                message: `User with id ${userData.id} success apply to job with id ${jobData.id}`,
                                status: 'success',
                                data: {
                                    userData,
                                    jobData
                                }
                            })
                    })
                })
        })
        .catch(err => {
            next('User already apply for this job')
        })
}

function allJobByUser(req, res, next) {
    Job.findAll({where: {createdById: req.params.userId}})
        .then(data => {
            res.send({
                message: `Showing all job created by user with id ${req.params.userId}`,
                status: 'success',
                data: data
            })
        })
        .catch(err => {
            next(err)
        })
}

function viewApplier(req, res, next) {
    let applier = []
    user_job.findAll({where: {jobId: req.params.id}})
        .then(data => {
            data.forEach(element => {
                applier.push(element.userId)
                console.log(element.userId)
            })
            User.findAll({where: {id: {[Op.or]: applier}}})
                .then(allData => {
                    res.send({
                        message: `Showing all applier for job with id ${req.params.id}`,
                        status: 'success',
                        data: allData
                    })
                })
        })
        .catch(err => {
            next(err)
        })
}

function setWorker(req, res, next) {
    Job.findByPk(req.params.jobId)
        .then(jobData => {
            jobData.doneById = req.params.userId
            jobData.save({fields: ['doneById']})
            res.status(200).send({
                message: `Success setting user with id ${req.params.userId} as worker for job with id ${req.params.jobId}`,
                status: 'success',
                data: {
                    jobData
                }
            })
        })
        .catch(err => {
            next(err)
        })
}

function clearAllJobs(req, res, next) {
    Job.destroy({truncate: true})
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
    createJob,
    showAllJob,
    jobByCategory,
    jobBySalary,
    applyJob,
    allJobByUser,
    viewApplier,
    setWorker,
    clearAllJobs
}