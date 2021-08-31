const { verify } = require("jsonwebtoken");
const orderModel = require("../models/order");
const productModel = require("../models/product");
const sql = require("../utils/vinayaks_sql_wrapper");

const verifyUser = (user_id, order_id) => {
  // true/false
  return new Promise((resolve, reject) => {
    orderModel
      .getOrderByOrderIdAndUserId(order_id, user_id)
      .then(([row, metadata]) => {
        if (row.length === 0) {
          resolve(false);
        } else if (row[0].user_id === user_id) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        console.log(err);
        resolve(false);
      });
  });
};

module.exports.getSingleOrder = async (req, res, next) => {
  try {
    await sql.start();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "database connection error" });
  }
  // verify user
  let valid = false;
  try {
    valid = await verifyUser(req.user.id, req.params.id);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "auth failed" });
  }
  if (!valid) {
    return res.status(400).json({ message: "auth failed" });
  }
  let order_data;
  let product_data;
  try {
    order_data = await orderModel.getOrderByOrderIdAndUserId(
      parseInt(req.params.id),
      req.user.id
    );
    product_data = await orderModel.getProductsFromOrder(
      parseInt(req.params.id),
      req.user.id
    );
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: " some thing went wrong" });
  }
  try {
    await sql.commit();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "some error happened" });
  }
  console.log(order_data);
  res.status(200).json({ order: order_data[0], products: product_data[0] });
};

module.exports.getAllOrders = (req, res, next) => {
  // function to get all orders for a user
  orderModel
    .getOrderByUserId(req.user.id)
    .then(([row, metadata]) => {
      res.status(200).json({ orders: row });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "some error happened" });
    });
};

module.exports.addOrder = async (req, res, next) => {
  /*
  data : {
    product_id : [],
    count : []
  }
  */
  try {
    await sql.start();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "database connection error" });
  }

  const product_id = req.body.product_id;
  const count = req.body.count;
  let total_prices = 0;
  let prices;
  try {
    prices = await productModel.getMultipleProductPrice(product_id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "unable to get product price" });
  }
  for (let i = 0; i < prices[0].length; i++) {
    total_prices += prices[0][i].price * count[i];
  }
  let order;
  try {
    order = await orderModel.createOrder(req.user.id, total_prices);
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: "unable to create order" });
  }
  const order_id = order[0].insertId;
  const data = [];
  for (let i = 0; i < req.body.product_id.length; i++) {
    data.push([order_id, req.body.product_id[i], req.body.count[i]]);
  }
  try {
    await orderModel.addProductToOrder(data);
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: "can't add products" });
  }
  await sql.commit();
  res.status(200).json({ message: "order created" });
};

module.exports.deleteOrder = async (req, res, next) => {
  // function to delete order for a user
  try {
    await sql.start();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "database connection error" });
  }
  // verify user
  let valid = false;
  try {
    valid = await verifyUser(req.user.id, req.params.id);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "auth failed" });
  }
  if (!valid) {
    return res.status(400).json({ message: "auth failed" });
  }
  try {
    await orderModel.deleteOrder(req.params.id, req.user.id);
    await orderModel.deleteProductFromOrder(req.params.id, req.user.id);
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: "some error happened !" });
  }
  try {
    await sql.commit();
    res.status(200).json({ message: "order deleted !" });
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: "some error happened !" });
  }
};

module.exports.updateOrder = async (req, res, next) => {
  /*
  add product to order
  delete product from order
  compute total price
  save order
  return order updated
  data : 
  {
    "add":[],
    "count": [],
    "delete":[4]
  }
  */
  try {
    await sql.start();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "database connection error" });
  }
  // verify user
  let valid = false;
  try {
    valid = await verifyUser(req.user.id, req.params.id);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "auth failed" });
  }
  if (!valid) {
    return res.status(400).json({ message: "auth failed" });
  }
  const add_data = [];
  const delete_data = [];
  let count = 0;
  let product;
  if (req.body.add !== undefined || req.body.add.length !== 0) {
    for (let i = 0; i < req.body.add.length; i++) {
      add_data.push([req.params.id, req.body.add[i], req.body.count[i]]);
    }
  }
  if (req.body.delete !== undefined || req.body.delete.length !== 0) {
    for (let i = 0; i < req.body.delete.length; i++) {
      delete_data.push([req.user.id, req.params.id, req.body.delete[i]]);
    }
  }
  try {
    if (add_data.length !== 0) {
      await orderModel.addProductToOrder(add_data);
    }
    if (delete_data.length !== 0) {
      await orderModel.deleteProductFromOrder(delete_data);
    }
    count = await orderModel.getProductCountFromOrder(
      req.params.id,
      req.user.id
    );
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: "some thing went wrong" });
  }

  try {
    product = await orderModel.getProductsFromOrder(req.params.id, req.user.id);
    product = product[0];
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: "some thing went wrong" });
  }
  const product_id = [];
  for (let i = 0; i < product.length; i++) {
    product_id.push(product[i].product_id);
  }

  let total_prices = 0;
  let prices = 0;
  try {
    prices = await productModel.getMultipleProductPrice(product_id);
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: "some thing went wrong !" });
  }
  for (let i = 0; i < prices[0].length; i++) {
    total_prices += prices[0][i].price * count[0][i].product_count;
    console.log(total_prices);
  }
  try {
    await orderModel.updateOrder(parseInt(req.params.id), String(total_prices));
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: "some thing went wrong !" });
  }
  try {
    await sql.commit();
  } catch (err) {
    console.log(err);
    await sql.rollback();
    res.status(400).json({ message: "some error happened !" });
  }
  res.status(200).json({ message: "order updated" });
};
