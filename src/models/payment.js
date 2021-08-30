const db = require("../../db");
const { create } = require("../utils/vinayaks_sql_wrapper");

class payment {
  static paymentStatus(data) {
    let fields = [
      "request_id",
      "payment_mode",
      "total_price",
      "order_id",
      "status",
      "user_id",
    ];
    let dataAndFields = {};
    for (let i = 0; i < fields.length; i++) {
      dataAndFields[fields[i]] = data[i];
    }

    console.log(dataAndFields);
    return create("payment_status", dataAndFields);
  }

  static getAllPaymentStatus() {
    return db.query("SELECT * FROM payment_status");
  }
}

module.exports = payment;
