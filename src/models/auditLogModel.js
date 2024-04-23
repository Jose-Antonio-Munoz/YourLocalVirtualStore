const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    eventType: {type:String,},
    userId: {type:String},
    details: {type:mongoose.Schema.Types.Mixed}
});

module.exports=mongoose.model('auditLog',auditLogSchema)