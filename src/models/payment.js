const db = require("../db");

  /*const order_id= pay.makepaym.or;
  const total_price=pay.makepaym.amt1;
  const Payment_mode=pay.makepaym.pm;
  const s=pay.makepaym.a;  
  if(s==1)
     var Payment_status="Successful";
  else
     var Payment_status="Failure";
  const Request_id=pay.b;  
*/
class payment {
  //var order_id= pay.makepaym.or;
  //var total_price=pay.makepaym.amt1;
  //var Payment_mode=pay.makepaym.pm;
  //var s=pay.makepaym.a;  
  /*Uif(s==1)
     let Payment_status="Successful";
  else
     let Payment_status="Failure";
  const Request_id=pay.b;  */

static paymentStatus(Request_id,Payment_mode,total_price,order_id,Payment_status) {
    return db.execute(
      `INSERT INTO test.payment_status(Request_id,Payment_mode,total_price,order_id,Payment_status) VALUES ( "${String(
        Request_id)}", " ${String(Payment_mode)}", " ${String(total_price)}", " ${String(order_id)}", " ${String(Payment_status)}" )  `
    );
  }
}
module.exports = payment;
