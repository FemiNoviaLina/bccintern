const Joi = require('joi')

const jobSchema = Joi.object().keys({
    jobTitle: Joi.string()
            .required(),
    
    jobDesc: Joi.string()
            .required(),
    
    location: Joi.string(),

    duration: Joi.number()
            .integer(),
    
    fee: Joi.number()
        .integer()
        .min(0)
        .required(),

    category: Joi.string()
})

module.exports = {
    "create": jobSchema
}