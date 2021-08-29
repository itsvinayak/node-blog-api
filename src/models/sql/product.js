const sql = require("../utils/vinayaks_sql_wrapper");

class product {
  static getSingleProductData(id) {
    // returning a promise
    return sql.retrieveBy("product", ["id", id]);
  }

  static getMultipleProductPrice(ids) {
    ids = ids.join(",");
    return db.query(`SELECT price FROM product WHERE id IN  (?) `, [ids]);
  }

  static getAllProductsData() {
    return sql.retrieve("product");
  }

  static deleteProduct(id) {
    return sql.delete("product", ["id", id]);
  }

  static createProduct(name, price, details) {
    let data = {
      name: name,
      price: price,
      details: details,
    };

    return sql.create("product", data);
  }

  static updateProduct(id, name, price, details) {
    let data = {
      name: name,
      price: price,
      details: details,
    };

    return sql.update("product", data, ["id", id]);
  }
}

module.exports = product;
