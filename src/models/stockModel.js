const mongoose=require('mongoose')

const stockSchema= new mongoose.Schema({
    name:{type:String,unique:true,required:true,index:true},
    productId:{type:String,required:true,index:true,unique:true},
    availability:{type:Boolean,required:true,index:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    imageName:{type:String},
})
module.exports=mongoose.model("Stock",stockSchema);