const Joi = require('joi')

const jobSchema = Joi.object().keys({
    jobTitle: Joi.string()
            .required(),
    
    jobDesc: Joi.string()
            .required(),
    
    location: Joi.string(),

    duration: Joi.number(),
    
    fee: Joi.number()
        .min(0)
        .required(),

    category: Joi.string()
})

module.exports = {
    "createJob": jobSchema
}