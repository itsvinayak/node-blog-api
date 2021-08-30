const {
  createUser,
  deleteUser,
  updateUser,
  getUserByUserId,
  getUsers,
  login,
  SignUp,
} = require("../controller/userController");
const router = require("express").Router();

const { auth } = require("../middleware/auth");

router.post("/", auth, createUser);
router.get("/", auth, getUsers);
router.get("/:id", auth, getUserByUserId);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);
router.post("/login", login);
router.post("/sign-up", SignUp);

module.exports = router;
