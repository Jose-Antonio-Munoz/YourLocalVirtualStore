const nodemailer = require('nodemailer');

const user=process.env.email 
const pass=process.env.pass

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass
  },
  authMethod: 'PLAIN',
});

