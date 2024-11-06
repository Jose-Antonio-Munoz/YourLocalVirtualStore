const mongoose=require('mongoose')
require('dotenv').config()

const connectToDB=()=>{
    const dbURI=process.env.MONGODBURI
    mongoose
    .connect(dbURI)
    .then(()=>{console.log("conexion establecida con mongoDB atlas")})
    .catch((err)=>{console.log("error conectando con mongoDB atlas", err)})
}
module.exports=connectToDB