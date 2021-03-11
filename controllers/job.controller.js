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
    })
    .catch(err => {
        next(err)
    })
}

function searchJob(req, res, next) {
    Job.findAll({where: {
        jobTitle: {
            [Op.or]: [
                {[Op.startsWith]: req.params.key},
                {[Op.endsWith]: req.params.key},
                {[Op.substring]: req.params.key}
            ]
        }
    }})    
        .then(data => {
            res.status(200).send({
                message: `Showing ${data.length} job(s) match ${req.params.key}`,
                status: 'success',
                data: data
            })
        })
        .catch(err => {
            next(err)
        })
}

function jobByCategory(req, res, next) {
    Job.findAll({where: {
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

function jobByLocation(req, res, next) {
    Job.findAll({where: {
        location: req.params.location
        }
    })
        .then(data => {
            res.status(200).send({
                message: `Showing ${data.length} job(s) at ${req.params.category}`,
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

function allFilter(req, res, next) {
    if(req.body.category != undefined && req.body.location != undefined) {
        Job.findAll({where: {
            [Op.and]: [
                {category: req.body.category},
                {fee: {[Op.between] : [req.body.minFee, req.body.maxFee]}},
                {location: req.body.location}
            ]
        }})
            .then(data => {
                res.status(200).send({
                    message: `Showing ${data.length} job match all filter`,
                    status: 'success',
                    data: data
                })
            })
            .catch(err => {
                next(err)
            })
    } else if(req.body.category == undefined && req.body.location == undefined) {
        Job.findAll({where: {
                fee: {[Op.between] : [req.body.minFee, req.body.maxFee]}
        }})
            .then(data => {
                res.status(200).send({
                    message: `Showing ${data.length} job match all filter`,
                    status: 'success',
                    data: data
                })
            })
            .catch(err => {
                next(err)
            })
    } else if(req.body.category == undefined) {
        Job.findAll({where: {
            [Op.and]: [
                {fee: {[Op.between] : [req.body.minFee, req.body.maxFee]}},
                {location: req.body.location}
            ]
        }})
            .then(data => {
                res.status(200).send({
                    message: `Showing ${data.length} job match all filter`,
                    status: 'success',
                    data: data
                })
            })
            .catch(err => {
                next(err)
            })
    } else if(req.body.location == undefined) {
        Job.findAll({where: {
            [Op.and]: [
                {category: req.body.category},
                {fee: {[Op.between] : [req.body.minFee, req.body.maxFee]}},
            ]
        }})
            .then(data => {
                res.status(200).send({
                    message: `Showing ${data.length} job match all filter`,
                    status: 'success',
                    data: data
                })
            })
            .catch(err => {
                next(err)
            })
    }
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
            if(err.message == 'Validation error') next('User already apply to this job')
            else next(err)
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
            if(req.user.id == jobData.createdById) {
                if(jobData.doneById == null) {
                    jobData.doneById = req.params.userId
                    jobData.save({fields: ['doneById']})
                    res.status(200).send({
                        message: `Success setting user with id ${req.params.userId} as worker for job with id ${req.params.jobId}`,
                        status: 'success',
                        data: {
                            jobData
                        }
                    })
                } else {
                    next('You already set someone to do this job')
                }
            } else {
                next('You are not allowed to set someone to do this job')
            }
        })
        .catch(err => {
            next(err)
        })
}

function jobDoneByUser(req, res, next) {
    Job.findAll({where: {doneById: req.params.id}})
        .then(data => {
            res.status(200).send({
                message: `Showing ${data.length} job(s) done by user with Id ${req.params.id}`,
                status: 'success',
                data: data
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
    searchJob,
    jobByCategory,
    jobBySalary,
    jobByLocation,
    allFilter,
    applyJob,
    allJobByUser,
    viewApplier,
    setWorker,
    jobDoneByUser,
    clearAllJobs
}