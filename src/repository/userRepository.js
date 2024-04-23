const User = require("../models/userModel");

exports.createUser=async(userData)=>{  
    return await User.create(userData)
}
exports.getUserByUsuario=async(userUsuario)=>{ // revisar y eliminar 
    return await User.findOne({usuario:userUsuario})
}
exports.getUser=async(userData)=>{ 
    return await User.findOne(userData)
}
exports.getUserById=async(userId)=>{ 
    return await User.findById(userId)
}
exports.updateUser=async(user)=>{
    return await user.save();
}
exports.getOneUser=async(user)=>{ 
    return await User.findOne(user).select('usuario email');
}
exports.getAllUsers=async(data,page,limit)=>{ 
    return await User.find(data).skip((page-1)*limit).limit(limit) ;
}
exports.updatePassword=async(userId,newPassword)=>{ // review
    return await User.findByIdAndUpdate(userId,newPassword,{new:true})
}
exports.deleteUser=async(email,usuario)=>{ 
    return await User.findOneAndDelete({email,usuario})
}