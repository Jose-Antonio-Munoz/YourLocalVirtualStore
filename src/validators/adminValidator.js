const { body } = require('express-validator');

exports.deleteWorker=[
    body('email').exists().withMessage('error, missing email').bail()
    .notEmpty().withMessage('email required').bail()
    .isEmail().withMessage('email invalid'),
    body('usuario').exists().withMessage('error, missing usuario').bail()
    .notEmpty().withMessage('Usuario requerido')
]