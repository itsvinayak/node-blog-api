const db = require("../../../sql_db");

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

  static updateOrder(id, price) {
    return db.query("UPDATE test.order SET total_price = ? WHERE id = ?", [
      price,
      id,
    ]);
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
    return db.query(" SELECT * FROM order_product WHERE order_id = ?", [
      order_id,
    ]);
  }

  static deleteProductFromOrder(item) {
    return db.query(
      "DELETE FROM order_product WHERE order_id = ? and product_id = ? ",
      ...item
    );
  }

  static deleteAllProductFromOrder(order_id) {
    return db.query("DELETE FROM order_product WHERE order_id = ?", [order_id]);
  }

  static getProductCountFromOrder(order_id) {
    return db.query(
      "SELECT product_count FROM order_product WHERE order_id = ?",
      [order_id]
    );
  }
}

module.exports = order;
