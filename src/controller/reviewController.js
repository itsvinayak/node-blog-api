const reviewModel = require("../models/reviews");

module.exports.getAllReviews = (req, res) => {
    reviewModel
    .getAllReviewsData()
    .then( ([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
    .catch((err) =>
      res.status(400).send({
        message: err
      })
    )
}

module.exports.addReview = (req, res) => {
    reviewModel
    .createReview( req.body.rating, req.body.review_detail)
    .then(res.status(201).json({ message: "review created" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};
module.exports.updateReview = (req, res) => {
    reviewModel
  .updateReview(req.params.rvid, req.body.rating, req.body.review_detail)
  .then(res.status(200).json({ message: "review updated" }))
  .catch((err) =>
    res.status(400).send({
      message: err,
    })
  );
};

module.exports.deleteReview = (req, res) => {
    reviewModel
    .deleteReview(req.params.rvid)
    .then(res.status(200).json({ message: "review deleted" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};


