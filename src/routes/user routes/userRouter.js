const express=require('express');
const router=express.Router();
const usuario=require('../../controllers/userController')
const userValidator=require('../../validators/userValidators')
const {roleAuth}=require('../../Auth/userAuth')
const validator=require('../../validators/validatorErrorHandler')
//const upload=multer(images)

router.post('/user/login',userValidator.login,validator.errorHandler,usuario.loginUser) 
router.post('/user/register',userValidator.createUserValidator,validator.errorHandler,usuario.createOneUser)  
router.get('/user/forgot-password',userValidator.forgotPassword,validator.errorHandler, usuario.forgottenPassword) // check the verb
router.post('/user/recovery-password',userValidator.recoveryPassword,validator.errorHandler,usuario.recoveryPassword)   
router.patch('/user/change-password',userValidator.changePassword,validator.errorHandler,roleAuth('user'),usuario.updateUserPassword); 
router.patch('/user/change-address',userValidator.addressValidator,validator.errorHandler,roleAuth('user'),usuario.modifyAddress)

module.exports=router