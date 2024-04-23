const auditLogRepository=require('../repository/auditLogRepository')

exports.auditLogger=async(req,res,next)=>{
    const userId = req.user ? req.user._id : null;
    const details = { url: req.url, method: req.method, body: {...req.body} };
    delete details.body.password
    await auditLogRepository.logEvent('HTTP Request', userId, details);
    next();
}