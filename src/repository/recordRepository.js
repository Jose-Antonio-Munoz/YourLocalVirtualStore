const Record=require('../models/recordModel')// dpulicate 

exports.getRecord=async(data,page,limit)=>{
    return await Record.find(data).skip((page-1)*limit).limit(limit) 

}
exports.findRecordToUpdate=async(data)=>{
    return await Record.findOne(data)
}
exports.getRecordById=async(recordId)=>{
    return await Record.findById(recordId)
}
exports.createRecord=async(user_Id,userName,userPhone,shipping_address,item_list, paymentId,total)=>{
    const newRecord= new Record({user_Id,userName,userPhone,shipping_address,item_list,paymentCompletedStatus:false,deliveryStatus:'pending payment',paymentId,total})
    return await newRecord.save()
}
exports.updateRecord=async(record)=>{
    return await record.save()
}
