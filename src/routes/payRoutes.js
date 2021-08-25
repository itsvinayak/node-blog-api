const express = require("express");
const router = express.Router();

const paymentController = require('../controller/payController')

router.use(express.json());

router.post('/', paymentController.makePayment);

module.exports = router;

