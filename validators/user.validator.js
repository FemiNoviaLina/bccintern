const Joi = require('joi')

const registerSchema = Joi.object().keys({
    email: Joi.string()
        .email({minDomainSegments: 2, 
            tlds: {
                allow: ['com', 'net']}
            })
        .required(),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
        .required()
        .strict(),

    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .strict()
})

const loginSchema = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(8)
        .required()
        .strict()
})

module.exports = {
    "register": registerSchema,
    "login": loginSchema
}