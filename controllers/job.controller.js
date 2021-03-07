const { Op } = require("sequelize");
const db = require('../models')
const Job = db.jobs
const User = db.users

function createJob(req, res, next) {
    console.log(req.user.id)
    Job.create(req.body) 
        .then(data => {
            data.createdById = req.user.id
            data.save({ fields: ['createdById']})
            res.status(200).send({
                message: 'Job created successfully',
                status: true,
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
                status: true,
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
                status: true,
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
                status: true,
                data: data
            })
        })
        .catch(err => {
            next(err)
        })
}

function applyJob(req, res, next) {
    Job.findByPk(req.params.id) 
        .then(jobData => {
            User.findByPk(req.user.id)
            .then(userData => {
                console.log(jobData.id)
                jobData.applier = jobData.applier + '-' + req.user.id
                jobData.save({ fields: ['applier']})
                userData.applyTo = req.user.applyTo + '-' + data.id
                userData.save({ fields: ['applyTo']})
                res.status(200).send({
                    message: `User with id ${userData.id} success applying to job with id ${jobData.id}`,
                    status: true,
                    data: {
                        userData,
                        jobData
                    }
                })
            })
        })
        .catch(err => {
            next(err)
        })    
}

function allJobByUser(req, res, next) {
    Job.findAll({where: {createdById: req.params.userId}})
        .then(data => {
            if(data != null) res.status(200).send({
                message: `Showing ${data.length} data created by user with id ${req.params.userId}`,
                status: true,
                data: data
            })
            else res.send({message: 'No job created by this user'})
        })
        .catch(err => {
            next(err)
        })
}

function viewApplier(req, res, next) {
    Job.findByPk(req.params.id)
        .then(data => {
            let applier = data.applier.split('-')
            applier.splice(0, 2)
            res.status(200).send({
                message: `Showing ${applier.length} applier for job with id ${req.params.id}`,
                status: true,
                data: applier
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
                status: true,
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
                status: true,
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