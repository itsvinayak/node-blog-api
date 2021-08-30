const db = require("../../db");
const sql = require("../utils/vinayaks_sql_wrapper");

class review {
  static getAllReviewsData() {
    return sql.retrieve("reviews");
  }

  static getsingleProductReviews(id) {
    return sql.retrieveBy("reviews", ["product_id", id]);
  }

  static createReview(id, user_id, rating, details) {
    let data = {
      user_id,
      product_id: id,
      rating,
      details,
    };
    return sql.create("reviews", data);
  }

  static updateReview(rvid, rating, details) {
    let data = { rating, details };
    return sql.update("reviews", data, ["id", rvid]);
  }

  static deleteReview(rvid) {
    return sql.delete("reviews", ["id", rvid]);
  }

  static checkuser(rvid) {
    return db.execute(`select * from reviews where id="${rvid}"`);
  }
}

module.exports = review;
