const{check}=require('express-validator')
const mongoose=require('mongoose')

exports.mongooseIdValidator = (fieldName) => {
    return check(fieldName).custom(value => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error(`${fieldName} must be a valid ObjectId`);
        }
        return true;
    });
};