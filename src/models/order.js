const db = require("../db");

class order {
  static getSingleOrderData(id) {
    // returning a promise
    return db.execute(`SELECT * FROM test.order WHERE id = ${id}`);
  }
  static getAllOrdersData(id) {
    return db.execute(`SELECT * FROM test.order WHERE user_id = ${id}`);
  }

  static deleteOrderID(id) {
    return db.execute(`DELETE FROM test.order WHERE id = ${id}`);
  }

  static createOrder(user_id, total_price) {
    return db.execute(
      `INSERT INTO test.order ( user_id, total_price) VALUES ( ${user_id}, "${String(
        total_price
      )}"  ) `
    );
  }

  static updateOrder(id, name, price, details) {
    return db.execute(
      `UPDATE order SET name = "${String(name)}" , price = "${String(
        price
      )}" , details = "${String(details)}" WHERE id = ${id}`
    );
  }

  static addProductToOrder(product_data) {
    // product_data is an object with the following properties
    // order_id,product_id, product_count (array format)
    return db.query(
      "INSERT INTO order_product ( order_id, product_id, product_count) VALUES ?",
      [product_data]
    );
  }

  static getProductToOrder(order_id) {
    return db.execute(
      ` SELECT * FROM order_product WHERE order_id = ${order_id} `
    );
  }

  static deleteProductFromOrder(order_id) {
    return db.query("DELETE FROM order_product WHERE order_id = ? ", [
      order_id,
    ]);
  }
}

module.exports = order;
