const db = require("../db");

class product {
  static getSingleProductData(id) {
    // returning a promise
    return db.execute(`SELECT * FROM product WHERE id = ${id}`);
  }
  static getAllProductsData() {
    return db.execute(`SELECT * FROM product`);
  }

  static deleteProduct(id) {
    return db.execute(`DELETE FROM product WHERE id = ${id}`);
  }

  static createpp(name, price, details) {
    return db.execute(
      `INSERT INTO product ( name, price, details) VALUES ( "${String(
        name
      )}", " ${String(price)}", " ${String(details)}"  )  `
    );
  }
}

module.exports = product;
