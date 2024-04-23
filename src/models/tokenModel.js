const mongoose = require('mongoose');

const recoveryTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports= mongoose.model('RecoveryToken', recoveryTokenSchema);