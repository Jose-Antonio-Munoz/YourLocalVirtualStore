const express=require('express')
const adminController=require('../../controllers/adminController')
const userValidator=require('../../validators/userValidators')
const recordController=require('../../controllers/recordController')
const {errorHandler}=require('../../validators/validatorErrorHandler')
const {mongooseIdValidator}=require('../../validators/mongoIdValidator')
const { roleAuth } = require('../../Auth/userAuth')
const { paginationValidator } = require('../../validators/paginationValidator')
const { deleteWorker } = require('../../validators/adminValidator')

const router=express.Router()


router.post('/admin/create-worker',userValidator.createUserValidator,errorHandler,roleAuth("admin"),adminController.createOneWorkerUser)
router.get('/admin/get-workers',roleAuth("admin"),adminController.getAllWorkerUser) 
router.delete('/admin/delete',deleteWorker,errorHandler,roleAuth("admin"),adminController.deleteOneWorkerUser)

router.get('/admin/deliveries',paginationValidator,errorHandler,roleAuth('admin'),recordController.getRecordToDeliver)
router.get('/admin/deliveries/:recordId',mongooseIdValidator('recordId'),errorHandler,roleAuth('admin'),recordController.getRecordById)
router.put('/admin/deliveries/:deliveryId/pending',roleAuth('admin'),recordController.pendingDelivery)
module.exports=router