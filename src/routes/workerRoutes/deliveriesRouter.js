const express=require('express')

const recordController=require('../../controllers/recordController')
const {errorHandler}=require('../../validators/validatorErrorHandler')
const {mongooseIdValidator}=require('../../validators/mongoIdValidator')
const { roleAuth } = require('../../Auth/userAuth')
const { paginationValidator } = require('../../validators/paginationValidator')

const router=express.Router()

router.get('/worker/deliveries',paginationValidator,errorHandler,roleAuth('worker'),recordController.getRecordToDeliver)
router.get('/worker/deliveries/:recordId',mongooseIdValidator('recordId'),errorHandler,roleAuth('worker'),recordController.getRecordById)
router.patch('/worker/deliveries/:recordId',mongooseIdValidator('recordId'),errorHandler,roleAuth('worker'),recordController.updateDelivery)

module.exports=router