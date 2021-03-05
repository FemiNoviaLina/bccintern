const jobValidators = require('./job.validators')
const userValidator = require('./user.validator')
const jobValidator = require('./job.validators')
const mentorValidator = require('./mentor.validators')

module.exports = { 
    "user" : userValidator,
    "job": jobValidator,
    "mentor": mentorValidator
}