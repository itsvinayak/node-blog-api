const express = require("express");
const productRouters = require("./routes/productRoutes");
const orderRouters = require("./routes/orderRoutes");
const userRouters = require("./routes/userRoutes");
const paymentRouters= require("./routes/payRoutes");

// loading environment variables
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

app.use("/products", productRouters);
app.use("/order", orderRouters);
app.use("/user", userRouters);
app.use("/payment", paymentRouters);

// 404 page
app.get((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});
app.listen(port, () => console.log(`Listening on port ${port}`));