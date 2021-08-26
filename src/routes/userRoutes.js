// const {
//   // createUser,
//   // deleteUser,
//   // updateUser,
//   // getUserByUserId,
//   // getUsers,
//   login,
//   // SignUp,
// } = require("../controller/userController");

// const router = require("express").Router();

// // const { checkToken } = require("../middleware/auth");

// // router.post("/", checkToken, createUser);
// // router.get("/", checkToken, getUsers);
// // router.get("/:id", checkToken, getUserByUserId);
// // router.patch("/", checkToken, updateUser);
// // router.delete("/", checkToken, deleteUser);
// router.post("/login", login);
// // router.post("/sign-up", SignUp);

// module.exports = router;


// --------------------------------Rudransh-Changes----------------------------//

const usercontroller = require("../controller/userController");
const router = require("express").Router();
const { auth } = require("../middleware/auth")
router.post("/",auth,usercontroller.createUser);
router.get("/",auth,usercontroller.getUsers);
router.get("/:id",auth,usercontroller.getUserByUserId);
router.patch("/:id",auth,usercontroller.updateUser);
router.delete("/:id",auth,usercontroller.deleteUser);
router.post("/login",usercontroller.login);
router.post("/sign-up",usercontroller.SignUp);

module.exports = router;
