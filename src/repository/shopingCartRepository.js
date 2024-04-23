const shopingCartModel=require('../models/shoppingCartModel')

exports.getShopingCartByUserId=async(userId)=>{
    return await shopingCartModel.findOne({userId:userId})
}
exports.getShopingCartAndPopulate=async(userId,populateParameter)=>{
    return await shopingCartModel.findOne({ userId: userId }).populate(populateParameter)
}
exports.createShopingCart=async(shopingCart)=>{
    return await shopingCartModel.create(shopingCart);
}
exports.updateItems=async(shopingCart)=>{
    return await shopingCart.save();
}
exports.deleteShopingCart=async(shopingCartId)=>{
    return await shopingCartModel.findByIdAndDelete(shopingCartId);
}
