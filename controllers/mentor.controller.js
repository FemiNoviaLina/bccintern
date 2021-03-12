const db = require('../models')
const Mentor = db.mentors
const User = db.users

function inputMentor(req, res, next) {
    Mentor.create(req.body) 
        .then(data => {
            res.status(200).send({
                message: 'Mentor successfully added',
                status: 'success',
                data: data
            })
        })
        .catch(err => {
            next(err)
        })
}

function viewMentor(req, res, next) {
    Mentor.findByPk(req.params.id)
        .then(data => {
            if(data != null)res.status(200).send({
                message: `Showing mentor data with id ${req.params.id}`,
                status: 'success',
                data: data
            })
            else next('Mentor not found')
        })
        .catch(err => {
            next(err)
        })
}

function showAllMentor(req, res, next) {
    Mentor.findAll()
        .then(data => {
            res.status(200).send({
                message: `Showing ${data.length} mentor(s)`,
                status: 'success',
                data: data
            })
        })
        .catch(err => {
            next(err)
        })
}

function mentorBySkill(req, res, next) {
    Mentor.findAll({where: {
        skill: req.params.skill
        }
    })
        .then(data => {
            res.status(200).send({
                message: `Showing ${data.length} mentor(s) match ${req.params.category} skill`,
                status: 'success',
                data: data
            })
        })
        .catch(err => {
            next(err)
        })
}

function pickMentor(req, res, next) {
    User.findByPk(req.user.id)
        .then(userData => {
            userData.mentorId = req.params.id
            userData.save({fields: ['mentorId']})
            Mentor.findByPk(req.params.id)
                .then(mentorData => {
                    res.send({
                        message: `User with id ${req.user.id} take mentor with id ${req.params.id} as mentor`,
                        status: 'success',
                        data: {
                            mentorData,
                            userData
                        }
                    })
                })
        })
        .catch(err => {
            next(err)
        })
}

function addPhoto(req, res, next) {
    Mentor.findByPk(req.params.id)
        .then(data => {
            if(data != null) {
                let name = req.file.path.split("/")
                data.picture = name[name.length - 1]
                data.save({fields: ['picture']})
                res.send({
                    message: 'Photo uploaded successfully',
                    status: 'success',
                    data: data
                })
            } else {
                next('Mentor not found')
            }  
        })
        .catch(err => {
            next(err)
        })
}

function clearAllMentor(req, res, next) {
    Mentor.destroy({truncate: true})
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
    inputMentor,
    viewMentor,
    showAllMentor,
    mentorBySkill,
    pickMentor,
    addPhoto,
    clearAllMentor
}