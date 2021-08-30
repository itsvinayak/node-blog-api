const express = require("express");
const categoryController = require("../controller/categoryController");
const router = express.Router();

const { auth } = require("../middleware/auth");

router.get("/", categoryController.getAllCategories);
router.get("/:id",categoryController.getSingleCategory);
router.post("/", auth, categoryController.addCategory);
router.put("/:id", auth, categoryController.updateCategory);
router.delete("/:id", auth, categoryController.deleteCategory);

module.exports = router;