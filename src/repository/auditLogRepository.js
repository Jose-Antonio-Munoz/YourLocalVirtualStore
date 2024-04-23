const AuditLog = require('../models/auditLogModel');

exports.logEvent=async(eventType, userId, details)=>{
    const auditLog = new AuditLog({
        eventType,
        userId,
        details
    });

    await auditLog.save();
}