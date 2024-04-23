const mongoose=require('mongoose')

const recordSchema = new mongoose.Schema({
    user_Id: {type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true},
    userName:{type:String},
    item_list:{type:[mongoose.Schema.Types.Mixed]},
    userPhone:{type:String},
    purchase_date: {type: Date,default: Date.now},
    payment_method: {type:String,default:'paypal'},
    paymentCompletedStatus:{type:Boolean,required:true,index:true},
    deliveryStatus:{type:String,require:true,index:true,},
    paymentId:{type:String},
    total:{type:Number},
    shipping_address: {type:String}
  });
module.exports=mongoose.model("Record",recordSchema);