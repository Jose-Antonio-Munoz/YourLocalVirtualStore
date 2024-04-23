const mongoose=require('mongoose')

// revisar nombres y las identificaciones >:V
const usuariosSchema= new mongoose.Schema({
    usuario:{type:String,unique:true,required:true,index:true},
    name:{type:String,require:true},
    email:{type:String,unique:true,required:true,index:true},
    password:{type:String,required:true},
    phoneNumber:{type:Number,index:true},
    created:{type:Date,required:true},
    role:{type:String,enum:['user','worker','admin'],default:'user',index:true}, 
    address:{type:String}
})
module.exports=mongoose.model("usuarios",usuariosSchema);