const cache = require('memory-cache');

exports.cacheMiddleware=async(req,res,next)=>{
    const key = req.originalUrl;

    const cachedData = cache.get(key);
    if (cachedData) {
        return res.send({cachedData});
    } 
    next();
    

}
