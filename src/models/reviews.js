const db = require("../db");

class review{
    static getAllReviewsData() {
      return db.execute(
        `SELECT *
        FROM reviews`
      );
    }
    
    static createReview(id, rating, details) {
      return db.execute(
        `INSERT INTO reviews (product_id, rating, details) 
        VALUES ("${String(id)}", "${String(rating)}", "${String(details)}")`
      );
    }
    
    static updateReview(rvid, rating, details) {
      return db.execute(
        `UPDATE reviews 
        SET rating = "${String(rating)}", details = "${String(details)}" 
        WHERE id = ${rvid}`
      );
    }
    
    static deleteReview(rvid) {
      return db.execute(
        `DELETE FROM reviews 
        WHERE id = ${rvid}`
      );
    }
}

module.exports = review;