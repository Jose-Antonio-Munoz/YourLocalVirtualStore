const Token=require('../models/tokenModel')

exports.saveToken=async(token)=>{
    return await Token.create(token)
}
exports.findTokenAndUserRelated=async(data)=>{
    return await Token.findOne(data).populate('userId')
}
exports.deleteToken=async(tokenId)=>{
    return await Token.findByIdAndDelete(tokenId)
}