const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();

const { admin } = require("../middleware/admin");

router.post("/", admin, productController.addProduct);
router.put("/:id", admin, productController.updateProduct);
router.delete("/:id", admin, productController.deleteProduct);
router.get("/:id", productController.getSingleProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
