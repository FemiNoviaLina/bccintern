const _ = require("lodash")
const Schemas = require("../validators")
const useJoiError = true

function joiValidator(req, res, next) {
    const _supportedMethods = ["post", "put"]

    const _validationOptions = {
        abortEarly : false,
        allowUnknown : true,
        stripUknwon : true,
    }

    let route = req.originalUrl.split("/")
    route.shift()
    //console.log(route)
    const method = req.method.toLowerCase()

    if(_.includes(_supportedMethods, method) && _.hasIn(Schemas, route)){
        const _schema = _.get(Schemas, route)
        
        
        if(_schema){
            const {value, error} = _schema.validate(req.body, _validationOptions)

            if(error){
                const JoiError = {
                    message : {
                        details : _.map(error.details,({message , type})=>({
                            message,
                            type
                        }))
                    },
                    status: 'unsuccess'
                }

                const customError = {
                    message : 'invalid request data. Pls review your request',
                    error : 'unsuccess'
                }

                return res.status(422).json(useJoiError ? JoiError : customError)
            }else{
                req.body = value
                return next()
            }
        }
    }
    req.body = null
    next()
    
}

module.exports = joiValidator