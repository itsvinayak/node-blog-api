const db = require("../../db");
const sql = require("../utils/vinayaks_sql_wrapper");

class category {
  //returns the details of all the categories
  static getAllCategoriesData() {
    return sql.retrieve("categories");
  }

  //returns all the products that belongs to the category id passed to the function
  static getSingleCategoryData(id) {
    return db.execute(
      `SELECT product.name as product_name, product.price as product_price, product.details as product_details, categories.name as category
        FROM product
        INNER JOIN categories
        WHERE product.category = categories.id AND categories.id = ${id}`
    );
  }

  //add a new category to the db taking in the name and details of the new category
  static createCategory(name, details) {
    let data = { name, details };
    return sql.create("categories", data);
  }

  //updates an existing category by taking in new name and details of the category whose id is passed as an arguement
  static updateCategory(id, name, details) {
    let data = { name, details };
    return sql.update("categories", data, ["id", id]);
  }

  //deletes an existing category whose id is passed as an arguement
  static deleteCategory(id) {
    return sql.delete("categories", ["id", id]);
  }
}

module.exports = category;
