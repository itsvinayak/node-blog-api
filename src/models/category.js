const db = require("../../db");
const sql = require("../utils/vinayaks_sql_wrapper");

class category{
    static getAllCategoriesData() {
      return sql.retrieve("categories");
    }

    static getSingleCategoryData(id) {
      return db.execute(
        `SELECT product.name as product_name, product.price as product_price, product.details as product_details, categories.name as category
        FROM product
        INNER JOIN categories
        WHERE product.category = categories.id AND categories.id = ${id}`
      )
    }
    
    static createCategory(name, details) {
      let data = {name, details};
      return sql.create("categories", data);
    }
    
    static updateCategory(id, name, details) {
      let data = {name, details};
      return sql.update("categories", data, ["id", id]);
    }
    
    static deleteCategory(id) {
      return sql.delete("categories", ["id", id]);
    }
}

module.exports = category;