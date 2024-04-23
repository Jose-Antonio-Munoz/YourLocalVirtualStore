const { roleAuth } = require('../../Auth/userAuth')
const paymentService = require('../../services/paymentService')
const paymentPaypal=require('../../services/paypalService')
const express = require('express')
const router= express.Router()

router.get('/paypal',roleAuth('user'),paymentService.sellStock) 
router.post('/payment',roleAuth('user'),paymentPaypal.payment)
module.exports=router