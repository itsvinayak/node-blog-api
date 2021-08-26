const express = require("express");
const reviewController = require("../controller/reviewController");
const router = express.Router();

router.get("/", reviewController.getAllReviews);
router.post("/", reviewController.addReview);
router.put("/:rvid", reviewController.updateReview);
router.delete("/:rvid", reviewController.deleteReview);

module.exports = router;