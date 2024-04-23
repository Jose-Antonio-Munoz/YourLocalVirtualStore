const crypto = require('crypto');

exports.generateResetToken =function() {
  return crypto.randomBytes(20).toString('hex');
}