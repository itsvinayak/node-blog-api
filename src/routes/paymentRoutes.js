const express = require("express");
const paymentController = require("../controller/paymentController");

// middleware required
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, paymentController.payment);
router.get("/", paymentController.displayPaymentdetails);

module.exports = router;
