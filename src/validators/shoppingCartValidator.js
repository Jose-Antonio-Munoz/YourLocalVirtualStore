const { body } = require('express-validator');

exports.addItem=[
    body('quantity')
    .exists().withMessage('error, missing value')
    .bail()
    .isNumeric().withMessage('quantity must be a number')
    .bail()
    .isLength({min:1,max:10}).withMessage('you can only buy between 1 and 10 products at time')
    .customSanitizer(value=>{
        return parseInt(value)
    })
]