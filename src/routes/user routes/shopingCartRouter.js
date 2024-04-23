const express = require('express')
const shopingCart = require('../../controllers/shoppingCartController')
const shopingCartValidator=require('../../validators/shoppingCartValidator')
const {mongooseIdValidator}=require('../../validators/mongoIdValidator')
const errorValidatorHandler=require('../..')
const { errorHandler } = require('../../validators/validatorErrorHandler')
const { roleAuth } = require('../../Auth/userAuth')
const router= express.Router()

router.post('/user/shopingCart/add_item/',mongooseIdValidator('itemId'),shopingCartValidator.addItem,errorHandler,roleAuth('user'),shopingCart.addItemToCart);
router.get('/user/shopingCart',errorHandler,roleAuth('user'),shopingCart.getAllItems)
router.patch('/user/shopingCart/remove/:itemId',mongooseIdValidator('itemId'),errorHandler,roleAuth('user'),shopingCart.deleteOneItemFromCart)

module.exports=router