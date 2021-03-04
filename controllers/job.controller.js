const { Op } = require("sequelize");
const db = require('../models')
const Job = db.jobs

function createJob(req, res, next) {
    Job.create(req.body) 
        .then(data => {
            data.createdById = req.user.id
            data.save({ fields: ['createdById']})
            res.status(200).send(data)
        })
        .catch(err => {
            next(err)
        })
}

function showAllJob(req, res, next) {
    Job.findAll({})
        .then(data => {
            res.status(200).send(data)
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
            [Op.between] : [req.body.minFee, req.body.maxFee]
        }
    }})
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            next(err)
        })
}

function takeJob(req, res, next) {
    Job.findByPk(req.params.id) 
        .then(data => {
            data.doneById = req.user.id
            data.save({ fields: ['doneById']})
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
    takeJob,
    clearAllJobs
}