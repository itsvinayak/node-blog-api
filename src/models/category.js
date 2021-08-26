const db = require("../db");

class category{
    static getAllCategoriesData() {
      return db.execute(
        `SELECT name, details 
        FROM categories`
      );
    }
    
    static createCategory(name, details) {
      return db.execute(
        `INSERT INTO categories (name, details) 
        VALUES ("${String(name)}", "${String(details)}")`
      );
    }
    
    static updateCategory(id, name, details) {
      return db.execute(
        `UPDATE categories 
        SET name = "${String(name)}" , details = "${String(details)}" 
        WHERE id = ${id}`
      );
    }
    
    static deleteCategory(id) {
      return db.execute(
        `DELETE FROM categories 
        WHERE id = ${id}`
      );
    }
}

module.exports = category;