const paypal = require('paypal-rest-sdk');
const paypalConfiguration=require('../configuration/paypalConfiguration')
const recordRepository=require('../repository/recordRepository')
exports.paypalPaymentGateway=async(item_list,total)=>{
    return new Promise((resolve, reject) =>{
      paypal.configure(paypalConfiguration)
        const payment = {
            intent: 'sale',
            payer: {
              payment_method: 'paypal'
            },
            redirect_urls: {
              return_url: 'http://localhost:3000/success', 
              cancel_url: 'http://localhost:3000/cancel' 
            },
            transactions: [{
              item_list,
              amount: {
                total,
                currency: 'USD'
              },
              description: 'Payment for Example Product',
            }]
          };
          paypal.payment.create(payment,async(err, payment) => {
            if (err) {
                console.error(err);
                reject('Internal Server Error');
            } else {
              const paymentId=payment.id
              const link=(payment.links.find(link => link.rel === 'approval_url')).href;
              resolve({link,paymentId})  
            }
          });
        })
}
exports.payment=async(req,res)=>{
    const { paymentId, payerId } = req.body;

  const execute_payment_json = {
    payer_id: payerId
  };

  paypal.payment.execute(paymentId, execute_payment_json, async (err, payment) => {
    if (err) {
      console.error(err.response);
      res.status(500).send('Internal Server Error');
    } else {
      let record= await recordRepository.findRecordToUpdate({paymentId:paymentId})
      record.paymentCompletedStatus=true
      record.deliveryStatus='pending'
      await recordRepository.updateRecord(record)
      res.json({ payment });
      
    }
  });
};
