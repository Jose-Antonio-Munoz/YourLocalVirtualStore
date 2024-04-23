const { body,query } = require('express-validator');

exports.getItemsByNameAndPrice=[
    query('price').optional().isFloat({gt:0}).withMessage('error, price must be a positive value').customSanitizer(value=>{
        return parseFloat(value)
    }),
    query('page').isInt().withMessage('error, enter a valid page number').customSanitizer(value=>{
        let sanitizeValue=parseInt(value)
        if(sanitizeValue<1){
            throw new Error(`page must be a least 1`)
        }
        return sanitizeValue
    }).optional(),
    query('limit').isInt({min:10}).withMessage('error, enter a valid limit value').customSanitizer(value=>{
        let sanitizeValue=parseInt(value)
        if(sanitizeValue<1){
            throw new Error(`limit must be a least 1`)
        }
        return sanitizeValue
    }).optional()
]
exports.createNewStockItem=[
    body('name').exists().withMessage('error, missing name')
    .bail()
    .isString().withMessage('the name must be an alphanumeric string'),
    body('price').isFloat({gt:0}).withMessage('the price must be a number').customSanitizer(value=>{
        return parseFloat(value)
    }),
    body('description')
    .exists().withMessage('error, missing description')
    .bail()
    .isString().withMessage('the description must be an alphanumeric string')
    .bail()
    .isLength({min:6,max:250}).withMessage('The description must contain a minimum of 6 characters and a maximum of 54.'),
    body('availability')
    .exists().withMessage('error, missing availability')
    .bail()
    .isBoolean().withMessage('error, availability must be true or false')
]
exports.modifyAvailavility=[
    body('availability')
    .exists().withMessage('error, missing availability')
    .bail()
    .isBoolean().withMessage('error, availability must be true or false')
]