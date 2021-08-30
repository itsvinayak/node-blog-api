const reviewModel = require("../models/reviews");
const db = require("../db");

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

module.exports.getParticularProductReviews = (req, res) => {
  reviewModel
  .getsingleProductReviews(req.params.id)
  .then( ([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
  .catch((err) =>
    res.status(400).send({
      message: err
    })
  )
}

module.exports.addReview = (req, res) => {
  // console.log(req.user.id);
    reviewModel
    .createReview(req.params.id, req.user.id, req.body.rating, req.body.details)
    .then(res.status(201).json({ message: "review created" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
}; 

module.exports.updateReview = (req, res) => {
  let reqid = db.execute(`select user_id from reviews where id="${req.params.rvid}"`);
  //
  console.log(reqid);
  if(reqid.user_id == req.user.id)
    reviewModel
    .updateReview(req.params.rvid, req.body.rating, req.body.details)
    .then(res.status(200).json({ message: "review updated" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
  else {
    res.status(401).json({ message: "sorry you are not authorized"});
  }
};

module.exports.deleteReview = (req, res) => {
  if(!req.user.admin){
    res.status(401).json({ message: "sorry you are not admin"});
  }
  else {
    reviewModel
    .deleteReview(req.params.rvid)
    .then(res.status(200).json({ message: "review deleted" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
  }
};


