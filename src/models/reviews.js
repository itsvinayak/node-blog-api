const db = require("../../db");
const sql = require("../utils/vinayaks_sql_wrapper");

class review {
  //returns all the reviews from the db
  static getAllReviewsData() {
    return sql.retrieve("reviews");
  }

  //returns reviews of the product whose id is passed
  static getsingleProductReviews(id) {
    return sql.retrieveBy("reviews", ["product_id", id]);
  }

  //adds a new review to the database taking in the productId, userId, rating and details
  static createReview(id, user_id, rating, details) {
    let data = {
      user_id,
      product_id: id,
      rating,
      details,
    };
    return sql.create("reviews", data);
  }

  //updates the rating and details of the review whose id is provided
  static updateReview(rvid, rating, details) {
    let data = { rating, details };
    return sql.update("reviews", data, ["id", rvid]);
  }

  //deletes a review whose review id is passed
  static deleteReview(rvid) {
    return sql.delete("reviews", ["id", rvid]);
  }

  //returns all the information of review whose reviewId is passed
  static checkuser(rvid) {
    return db.execute(`select * from reviews where id="${rvid}"`);
  }
}

module.exports = review;
