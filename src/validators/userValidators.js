const { body } = require('express-validator');

exports.createUserValidator=[
    body('usuario')
    .exists().withMessage('error, missing usuario')
    .bail()
    .notEmpty().withMessage('usuario is empty'),
    body('name')
    .exists().withMessage('error, missing name')
    .bail()
    .isLength({ min:2,max:32 }).withMessage('write a valid name with a least two letters'),
    
    body('phoneNumber')
    .exists().withMessage('error, missing uphone number')
    .bail()
    .isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 characters long')
    .bail()
    .matches(/^\+?[0-9]+$/).withMessage('Phone number must contain only digits'),
    
    body('email')
    .exists().withMessage('error, missing email')
    .bail()
    .isEmail().withMessage('Email invalido'),

    body('password')
    .exists().withMessage('error, missing password')
    .bail()
    .isLength({ min: 6,max:54 }).withMessage('The password must contain a minimum of 6 characters and a maximum of 54.'),

    body('address')
    .exists().withMessage('Address line 1 is required')
    .isLength({ min: 1 }).withMessage('Address line 1 must not be empty').optional()
]
exports.login=[
    body('email')
    .exists().withMessage('error, missing email')
    .bail()
    .isEmail().withMessage('invalid email'),

    body('password')
    .exists().withMessage('error, missing password')
    .bail()
    .isLength({ min: 6,max:54 }).withMessage('The password must contain a minimum of 6 characters and a maximum of 54.'),
]
exports.forgotPassword=[
    body('email')
    .exists().withMessage('error, missing email')
    .bail()
    .notEmpty().withMessage('Email is required')
    .bail()
    .isEmail().withMessage('Invalid email address'),
]
exports.recoveryPassword=[
    body('email')
    .exists().withMessage('error, missing email')
    .bail()
    .notEmpty().withMessage('Email is required')
    .bail()
    .isEmail().withMessage('Invalid email address'),

    body('userToken')
    .exists().withMessage('error, missing token'),
    body('newPassword')
    .exists().withMessage('error, missing newPassword')
    .bail()
    .isLength({ min: 6,max:54 }).withMessage('The password must contain a minimum of 6 characters and a maximum of 54.'),

]
exports.changePassword=[
    body('newPassword')
    .exists().withMessage('error, missing new Password')
    .bail()
    .isLength({ min: 6,max:54 }).withMessage('The password must contain a minimum of 6 characters and a maximum of 54.'),
    body('Password')
    .exists().withMessage('error, missing old Password')
    .bail()
    .isLength({ min: 6,max:54 }).withMessage('The password must contain a minimum of 6 characters and a maximum of 54.')
]
exports.addressValidator=[
    body('address')
    .exists().withMessage('Address line 1 is required')
    .isLength({ min: 1 }).withMessage('Address line 1 must not be empty')
]