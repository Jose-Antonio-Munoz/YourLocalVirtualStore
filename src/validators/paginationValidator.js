const { query } = require('express-validator');

exports.paginationValidator=[
    query('page').isInt().withMessage('error, enter a valid page').customSanitizer(value=>{
        let sanitizeValue=parseInt(value)
        if(sanitizeValue<1){
            throw new Error(`page must be a least 1`)
        }
        return sanitizeValue
    }).optional(),
    query('limit').isInt({min:10}).withMessage('error, enter a valid value').customSanitizer(value=>{
        let sanitizeValue=parseInt(value)
        if(sanitizeValue<1){
            throw new Error(`limit must be a least 1`)
        }
        return sanitizeValue
    }).optional()
]