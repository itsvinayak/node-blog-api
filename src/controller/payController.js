const { v4: uuidv4 } = require('uuid');

const paymentModel = require("../models/payment");
const paymentValidation = require('../utils/paymentMethod');

module.exports.makePayment = (req, res, next) => {

  const pm=req.body.Paymentmode;
  const vc=req.body.Vcode;  

let status=false;

if (pm=='upi')
{
  status=paymentValidation.upi(vc);
}
if(pm=='paytm')
{
  status=paymentValidation.paytm(vc);
}
 if(pm=='Netbanking')
{
  status=paymentValidation.netbank(vc);
}
if(pm=='CreditCard')
{
  status=paymentValidation.creditc(vc);
}
if(pm=='DebitCard')
{
  status=paymentValidation.debitc(vc);
}
 
if(status==true)
{
  let status1=1;
}
  let status1=0;

if(status1 === 1){
  data =  {
    Success : 0000,
    message: "Successful Payment"
    }
  }
  else{
  data =  {
    Failure : 0011,
    message: "Payment Failure"
    }
  }
  
  status=status1===1?"successful":"failure";

paymentModel
    .paymentStatus(uuidv4(), req.body.Paymentmode, req.body.amt, req.body.order_id, status1)
    .then(res.status(201).send(data))
        .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};
