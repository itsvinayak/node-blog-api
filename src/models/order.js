const db = require("../../db");
const sql = require("../utils/vinayaks_sql_wrapper");

class order {
  static getOrderByUserId(id) {
    return sql.retrieveBy("test.order", ["user_id", id]);
  }

  static getOrderByOrderIdAndUserId(id, userId) {
    return db.query(`SELECT * from test.order WHERE id=? AND user_id=?`, [
      id,
      userId,
    ]);
  }

  static deleteOrder(orderId, userId) {
    return db.query(
      `DELETE FROM test.order_product WHERE order_id = ? AND user_id = ?`,
      [orderId, userId]
    );
  }

  static updateOrder(orderId, userId, price) {
    let data = {
      total_price: price,
    };
    return db.query(`UPDATE test.order SET ? WHERE id = ? AND user_id = ?`, [
      data,
      orderId,
      userId,
    ]);
  }

  static createOrder(userId, total_prices) {
    let data = {
      user_id: userId,
      total_price: total_prices,
    };
    return sql.create("test.order", data);
  }

  static addProductToOrder(data) {
    return db.query(
      "INSERT INTO order_product ( order_id, product_id, product_count) VALUES ?",
      [data]
    );
  }
  static deleteProductFromOrder(data) {
    return db.query(
      `DELETE test.order_product FROM test.order_product INNER JOIN test.order ON test.order_product.order_id = test.order.id WHERE (user_id,order_id,product_id) IN ?`,
      [[data]]
    );
  }

  static getProductsFromOrder(orderId, userId) {
    return db.query(
      `SELECT product_id, product_count, total_price FROM test.order_product INNER JOIN test.order ON test.order_product.order_id = test.order.id WHERE order_id = ? AND user_id = ?`,
      [orderId, userId]
    );
  }

  static getProductCountFromOrder(orderId, userId) {
    return db.query(
      `SELECT product_count FROM test.order_product INNER JOIN test.order ON test.order_product.order_id = test.order.id WHERE order_id = ? AND user_id = ?`,
      [orderId, userId]
    );
  }
}

module.exports = order;
