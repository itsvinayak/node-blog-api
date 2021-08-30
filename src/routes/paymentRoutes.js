const express = require("express");
const paymentController = require("../controller/paymentController");

// middleware required
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

const router = express.Router();

router.post("/", auth, paymentController.payment);
router.get("/", admin, paymentController.getAllPayment);

module.exports = router;
