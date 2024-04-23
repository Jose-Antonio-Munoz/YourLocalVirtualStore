
const jwt=require('jsonwebtoken')
const jwtSecret=process.env.JWTSECRET

exports.roleAuth=(role)=>{
    return async(req,res,next)=>{
        try{
            if(!req.headers.authorization){
                return res.status(401).json({ message: "Unauthorized, token not available" })
            }
            const token = req.headers.authorization.split(' ')[1]
            await jwt.verify(token,jwtSecret,(err,decodeToken)=>{
                if(err){
                    console.log(err)
                    return res.status(401).json({message:"no autorizado"})
                }
                if(decodeToken.role!=role){
                    return res.status(403).json({message:`error, you do not have the appropriate role to access`})
                }
                
                req.id=decodeToken.id
                req.usuario=decodeToken.usuario
                    next();
            })
    
        }catch(err){
            return res.status(500).json({ message: 'internal server error', error: err});
        }
    }
}



