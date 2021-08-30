const reviewModel = require("../models/reviews");
const db = require("../db");

module.exports.getAllReviews = (req, res) => {
  reviewModel
    .getAllReviewsData()
    .then(([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.getParticularProductReviews = (req, res) => {
  reviewModel
    .getsingleProductReviews(req.params.id)
    .then(([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.addReview = (req, res) => {
  reviewModel
    .createReview(req.params.id, req.user.id, req.body.rating, req.body.details)
    .then(res.status(201).json({ message: "review created" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.updateReview = async (req, res, next) => {
  let reqid;
  try {
    reqid = await reviewModel.checkuser(req.params.rvid);
  } catch (err) {
    console.log(err);
  }

  reqid = reqid[0][0].user_id;

  if (reqid !== req.user.id) {
    res.status(400).json({
      message: "Not authorized to update",
    });
  }

  try {
    await reviewModel.updateReview(
      req.params.rvid,
      req.body.rating,
      req.body.details
    );
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
  res.status(200).send({
    message: "review updated",
  });
};

module.exports.deleteReview = async (req, res) => {
  let reqid;
  try {
    reqid = await reviewModel.checkuser(req.params.rvid);
  } catch (err) {
    console.log(err);
  }

  reqid = reqid[0][0].user_id;

  if (reqid !== req.user.id && !req.user.admin) {
    res.status(400).json({
      message: "Not authorized to delete",
    });
  }

  try {
    await reviewModel.deleteReview(req.params.rvid);
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
  res.status(200).send({
    message: "review deleted",
  });
};
