const paypal = require('paypal-rest-sdk');

  const paypalConfiguration={
    mode: 'sandbox', // sandbox
    client_id: process.env.clientID,
    client_secret: process.env.secretPassword
  }; 
  module.exports=paypalConfiguration