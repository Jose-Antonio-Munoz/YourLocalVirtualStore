const mongoose=require('mongoose')

const shopingCartSchema=new mongoose.Schema({
    productList:[{
        itemId: { type:mongoose.Schema.Types.ObjectId, ref:'Stock', required:true },
        quantity: { type:Number,default:1 }
    }],
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'usuarios', required:true, unique:true}
})

module.exports=mongoose.model("shopingCart",shopingCartSchema);