const db = require("../../db");

class product {
  static getSingleProductData(id) {
    // returning a promise
    return db.execute(`SELECT * FROM product WHERE id = ${id}`);
  }

  static getMultipleProductPrice(ids) {
    ids = ids.join(",");
    console.log(ids);
    return db.execute(`SELECT price FROM product WHERE id IN  (${ids}) `);
  }

  static getAllProductsData() {
    return db.execute(`SELECT * FROM product`);
  }

  static deleteProduct(id) {
    return db.execute(`DELETE FROM product WHERE id = ${id}`);
  }

  static createProduct(name, price, details) {
    return db.execute(
      `INSERT INTO product ( name, price, details) VALUES ( "${String(
        name
      )}", " ${String(price)}", " ${String(details)}"  )  `
    );
  }

  static updateProduct(id, name, price, details) {
    return db.execute(
      `UPDATE product SET name = "${String(name)}" , price = "${String(
        price
      )}" , details = "${String(details)}" WHERE id = ${id}`
    );
  }
}

module.exports = product;
