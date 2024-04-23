const { roleAuth } = require('../../Auth/userAuth')
const { cacheMiddleware } = require('../../cache/cacheMiddleware')
const record=require('../../controllers/recordController')
const express=require('express')
const router=express.Router()

router.get('/user/history',roleAuth('user'),record.getRecordByUserId)



module.exports=router
