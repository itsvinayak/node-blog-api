const express = require("express");
const reviewController = require("../controller/reviewController");
const router = express.Router();

const { auth } = require("../middleware/auth");

router.get("/:id/reviews/", reviewController.getAllReviews);
router.post("/:id/reviews/", auth, reviewController.addReview);
router.put("/:id/reviews/:rvid", auth, reviewController.updateReview);
router.delete("/:id/reviews/:rvid", auth, reviewController.deleteReview);

module.exports = router;