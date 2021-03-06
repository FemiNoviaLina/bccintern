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
            res.status(200).send(data)
        })
        .catch(err => {
            if(err.message == 'Validation error') next('invalid request format')
            else next(err)
        })
}

function showAllJob(req, res, next) {
    Job.findAll({})
        .then(data => {
            if(data.length != 0)res.status(200).send(data)
            else res.send({message: 'no job data to show'})
        })
        .catch(err => {
            next(err)
        })
}

function jobByCategory(req, res, next) {
    Job.findAll({where: 
        {
        category: req.params.category
        }
    })
        .then(data => {
            res.status(200).send(data)
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
            res.status(200).send(data)
        })
        .catch(err => {
            next(err)
        })
}

function applyJob(req, res, next) {
    Job.findByPk(req.params.id) 
        .then(data => {
            User.findByPk(req.user.id)
            .then(userData => {
                console.log(data.id)
                data.applier = data.applier + '-' + req.user.id
                data.save({ fields: ['applier']})
                userData.applyTo = req.user.applyTo + '-' + data.id
                userData.save({ fields: ['applyTo']})
                res.status(200).send(data)
            })
        })
        .catch(err => {
            next(err)
        })    
}

function allJobByUser(req, res, next) {
    Job.findAll({where: {createdById: req.params.userId}})
        .then(data => {
            if(data != null) res.status(200).send(data)
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
            res.status(200).send(applier)
        })
        .catch(err => {
            next(err)
        })
}

function setWorker(req, res, next) {
    Job.findByPk(req.params.jobId)
        .then(data => {
            data.doneById = req.params.userId
            data.save({fields: ['doneById']})
            res.status(200).send(data)
        })
        .catch(err => {
            next(err)
        })
}

function clearAllJobs(req, res, next) {
    Job.destroy({truncate: true})
        .then(resolved => {
            res.status(200).send({
                message: `cleared successfully`
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