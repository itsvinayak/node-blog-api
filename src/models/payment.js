const db = require("../../db");

class payment {
  static paymentStatus(data) {
    console.log([...data]);
    return db.query(
      "INSERT INTO payment_status (request_id, payment_mode, total_price, order_id, status, user_id) VALUES (?, ?, ?, ?, ?,?)",
      [...data]
    );
  }
  static getPayment()
{
return db.execute('SELECT * FROM payment_status');
}
}


module.exports = payment;
