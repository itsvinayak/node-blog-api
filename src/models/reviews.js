const db = require("../db");

class review{
    static getAllReviewsData() {
      return db.execute(
        `SELECT rating, review_detail 
        FROM reviews`
      );
    }
    
    static createReview( rating, review_detail) {
      return db.execute(
        `INSERT INTO reviews (  rating, review_detail) 
        VALUES ("${String(rating)}", "${String(review_detail)}")`
      );
    }
    
    static updateReview(rvid, rating, review_detail) {
      return db.execute(
        `UPDATE reviews 
        SET rating = "${String(rating)}", review_detail = "${String(review_detail)}" 
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