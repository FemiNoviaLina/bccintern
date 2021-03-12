const Joi = require('joi')

const jobSchema = Joi.object().keys({
    jobTitle: Joi.string()
            .required(),
    
    jobDesc: Joi.string()
            .required(),

    requirement: Joi.string(),
    
    location: Joi.string(),

    duration: Joi.string(),
    
    fee: Joi.number()
        .integer()
        .min(0)
        .required(),

    contactPerson: Joi.string(),
    
    category: Joi.string()
})

module.exports = {
    "create": jobSchema
}