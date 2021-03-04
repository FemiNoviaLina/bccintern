const db = require('../models')
const Mentor = db.mentors

function inputMentor(req, res, next) {
    Mentor.create(req.body) 
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            next(err)
        })
}

function clearAllMentor(req, res, next) {
    Mentor.destroy({truncate: true})
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
    inputMentor,
    clearAllMentor
}