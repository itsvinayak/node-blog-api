const reviewModel = require("../models/reviews");

//function to checks if the review whose reviewId is passed was created by the currentUser
async function verifyUser(reviewId, currentUser){
  let reqid;
  try {
    //checkuser takes in review Id and return all the information of that review
    reqid = await reviewModel.checkuser(reviewId);
  } catch (err) {
    console.log(err);
  }

  //retriving the user_id from the information
  reqid = reqid[0][0].user_id;

  // checking if the userId matches with the currentuser
  //if true then the review was created by the user currently logged in
  return (reqid == currentUser)
}

//retriving all the reviews from the database
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

//retriving the reviews of a particular product by passing the product id to the query
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

//adding a new review to the db taking in the productId, userId, rating and details
module.exports.addReview = (req, res) => {
  reviewModel
    .createReview(req.params.id, req.user.id, req.body.rating, req.body.details)
    .then(res.status(201).json({ message: "A new review has been successfully created" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

//updating an existing review taking in new rating and details
module.exports.updateReview = async (req, res, next) => {

  let valid =  await verifyUser(req.params.rvid, req.user.id);

  // checking if the user trying to update is the creator of the review
  if (!valid) {
    res.status(400).json({
      message: "Oops! Not authorized to update",
    });
  }

  //allowed to update only when user is verified to be authorized
  try {
    await reviewModel.updateReview(
      req.params.rvid,
      req.body.rating,
      req.body.details
    );
    res.status(200).send({
      message: "review has been updated successfully",
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
};

//deleting an existing category using the reviewId provided
module.exports.deleteReview = async (req, res) => {

  let valid =  await verifyUser(req.params.rvid, req.user.id);

  //only allowing either the admin or the creator of the review to go further and delete
  if (!valid && !req.user.admin) {
    res.status(400).json({
      message: "Oops! Not authorized to delete",
    });
  }

  try {
    await reviewModel.deleteReview(req.params.rvid);
    res.status(200).send({
      message: "review has been deleted successfully",
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
};
