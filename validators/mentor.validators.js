const Joi = require('joi')

const mentorSchema = Joi.object().keys({
    name: Joi.string()
        .required(),
    
    occupation: Joi.string()
        .required(),

    skill: Joi.string()
        .required(),

    resume: Joi.string(),

    fee: Joi.number()
        .min(0)
        .required()
})

module.exports = {
    "addMentor": mentorSchema
}