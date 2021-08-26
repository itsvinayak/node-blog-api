const order = require("../models/order");
const orderModel = require("../models/order");
const productModel = require("../models/product");

const verifyOrder = (user_id, order_id) => {
  orderModel.getSingleOrder(order_id).then(([rows, metadata]) => {
    rows = rows[0];
    if (rows.user_id == user_id) {
      return true;
    }
    return false;
  });
};

module.exports.getSingleOrder = async (req, res, next) => {
  let order_data;
  let product_data;
  try {
    order_data = await orderModel.getSingleOrderData(req.params.id);
    product_data = await orderModel.getProductToOrder(req.params.id);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: " some thing went wrong" });
  }
  res.status(200).json({ order: order_data[0], product: product_data[0] });
};

module.exports.getAllOrders = (req, res, next) => {
  console.log(req.user);
  orderModel
    .getAllOrdersData(req.user.id)
    .then(([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.addOrder = async (req, res, next) => {
  // verify 
  try {
    let product_id = req.body.product_id;
    let count = req.body.count;
    let total_prices = 0;
    let prices = await productModel.getMultipleProductPrice(product_id);
    for (let i = 0; i < prices[0].length; i++) {
      total_prices += prices[0][i].price * count[i];
      console.log(total_prices);
    }
    let order = await orderModel.createOrder(req.user.id, total_prices);
    let order_id = order[0].insertId;
    const data = [];
    for (let i = 0; i < req.body.product_id.length; i++) {
      data.push([order_id, req.body.product_id[i], req.body.count[i]]);
    }
    await orderModel.addProductToOrder(data);
    res.status(200).json({ message: "order created" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "can't create order" });
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    await orderModel.deleteOrderID(req.params.id);
    await orderModel.deleteAllProductFromOrder(req.params.id);
    res.status(200).json({ message: "order deleted !" });
  } catch (err) {
    console.log(err);
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
  */
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
      delete_data.push([req.params.id, req.body.delete[i]]);
    }
  }
  try {
    if (add_data.length !== 0) {
      await orderModel.addProductToOrder(add_data);
    }
    if (delete_data.length !== 0) {
      await orderModel.deleteProductFromOrder(delete_data);
    }
    count = await orderModel.getProductCountFromOrder(req.params.id);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "some thing went wrong" });
  }

  try {
    product = await orderModel.getProductToOrder(req.params.id);
    product = product[0];
  } catch (err) {
    console.log(err);
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
    res.status(400).json({ message: "some thing went wrong !" });
  }
  res.status(200).json({ message: "order updated" });
};
