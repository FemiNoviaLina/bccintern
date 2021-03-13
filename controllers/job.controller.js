const { Op } = require("sequelize");
const db = require('../models');
const Job = db.jobs
const User = db.users
const user_job = db.user_job

function createJob(req, res, next) {
    Job.create(req.body) 
        .then(data => {
            data.createdById = req.user.id
            if(req.file) {
                let name = req.file.path.split("/")
                data.picture = name[name.length - 1]
            }
            data.save({ fields: ['createdById']})
            data.save({ fields: ['picture']})
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
            [Op.substring]: req.params.key
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
                message: `Showing ${data.length} job(s) at ${req.params.location}`,
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
    if(req.body.minFee != '' && req.body.maxFee != '' && req.body.location != '' && req.body.key != '') {
        Job.findAll({where: {
            [Op.and]: [
                {jobTitle: {[Op.substring]: req.body.key}},
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
    } else if(req.body.key != '' && req.body.location == '' && req.body.minFee != '' && req.body.maxFee != '') {
        Job.findAll({where: {
            [Op.and]: [
                {jobTitle: {[Op.substring]: req.body.key}},
                {fee: {[Op.between] : [req.body.minFee, req.body.maxFee]}}
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
    } else if(req.body.minFee == '' && req.body.maxFee == '' && req.body.location != '' && req.body.key != '') {
        Job.findAll({where: {
            [Op.and]: [
                {jobTitle: {[Op.substring]: req.body.key}},
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
    } else if(req.body.minFee != '' && req.body.maxFee != '' && req.body.location != '' && req.body.key == '') {
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
    } else if(req.body.minFee == '' && req.body.maxFee == '' && req.body.location == '' && req.body.key != '') {
        Job.findAll({where: {
            jobTitle: {[Op.substring]: req.body.key}
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
    } else if(req.body.minFee != '' && req.body.maxFee != '' && req.body.location == '' && req.body.key == '') {
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
    } else if(req.body.minFee == '' && req.body.maxFee == '' && req.body.location != '' && req.body.key == '') {
        Job.findAll({where: {
            location: req.body.location
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
    } else {
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
}

function applyJob(req, res, next) {
    Job.findByPk(req.params.id)
        .then(jobData => {
            if(jobData && jobData.createdById != req.user.id) {
                user_job.create({
                    userId: req.user.id,
                    jobId: req.params.id
                })
                    .then(data => {
                        Promise.all([User.findByPk(data.userId), Job.findByPk(data.jobId)])
                            .then(userJob => {
                                [user, job] = userJob
                                res.status(200).send({
                                    message: `User with id ${user.id} success apply to job with id ${job.id}`,
                                    status: 'success',
                                    data: {
                                        user,
                                        job
                                    }
                                })
                            })
                    })
                    .catch(err => {
                        if(err.message == 'Validation error') next('User already apply to this job')
                        else next(err)
                    })
            } else if(!jobData){
                next('Job not found')
            } else {
                next({statusCode: 403, message: 'cannot apply to self-created jobs'})
            }
        })
}

function allJobByUser(req, res, next) {
    Job.findAll({where: {createdById: req.params.userId}})
        .then(data => {
            res.send({
                message: `Showing ${data.length} job(s) created by user with id ${req.params.userId}`,
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
            if(jobData.createdById == req.user.id && jobData.createdById != req.params.userId) {
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
            } else if(jobData.createdById != req.user.id) {
                next({statusCode: 403, message: 'You are not allowed to set someone to do this job'})
            } else if(jobData.createdById == req.params.userId){
                next('You cannot set yourself to do this job')
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

function updateJob(req, res, next) {
    Promise.all([Job.update(req.body, {where: {id: req.params.id}}), Job.findByPk(req.params.id)])
        .then(data => {
            [rowAffected, jobData] = data
            if(req.file) {
                let name = req.file.path.split("/")
                jobData.picture = name[name.length - 1]
                jobData.save({ fields: ['picture']})
            }
            res.status(200).send({
                message: `Job data with id ${req.params.id} succesfully updated`,
                status: 'success',
                data: jobData
            })
        })
        .catch(err => {
            next(err)
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
    updateJob
}