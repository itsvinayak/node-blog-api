const express = require("express");
const categoryController = require("../controller/categoryController");
const router = express.Router();

//admin middleware to check if the loggedIn user is admin using bearer token
//also check if a user is loggen in or not as well
const { admin } = require("../middleware/admin");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getSingleCategory);
router.post("/", admin, categoryController.addCategory);
router.put("/:id", admin, categoryController.updateCategory);
router.delete("/:id", admin, categoryController.deleteCategory);

module.exports = router;
