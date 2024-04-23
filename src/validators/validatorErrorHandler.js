const { validationResult } = require('express-validator');

exports.errorHandler=async(req,res,next)=>{
    const result=validationResult(req)
    if(result.isEmpty()){
        return next()
    }
    const error=result.errors[0].msg
    return res.status(400).json({error:error})
}
