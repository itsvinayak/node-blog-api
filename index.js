const express = require("express");
const productRouters = require("./src/routes/productRoutes");
const orderRouters = require("./src/routes/orderRoutes");
const userRouters = require("./src/routes/userRoutes");
const controller = require("./src/controller/userController");
const categoryRouters = require("./src/routes/categoryRoutes");
const reviewRouters = require("./src/routes/reviewRoutes");
const paymentRouters = require("./src/routes/paymentRoutes");

// loading environment variables
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

// routers
app.use("/products", productRouters);
app.use("/order", orderRouters);
app.use("/user", userRouters);
app.use("/category", categoryRouters);
app.use("/product", reviewRouters);
app.use("/payment", paymentRouters);

// 404 page
app.get((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
