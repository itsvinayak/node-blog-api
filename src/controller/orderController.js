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

module.exports.getSingleOrder = (req, res, next) => {
  // if(! verifyOrder(req.user.id, req.params.id)){
  // }
  orderModel
    .getSingleOrderData(req.params.id)
    .then(([rows, metadata]) => {
      rows = rows;
      orderModel
        .getProductToOrder(req.params.id)
        .then(([rows2, metadata]) => {
          res.status(200).json({ order: rows, products: rows2 });
        })
        .catch((err) => res.status(400).json({ message: err }));
    })
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
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

module.exports.addOrder = (req, res, next) => {
  // format : {
  // [ 1,2,3] list of product id
  // [count] of products
  // }
  let product_id = req.body.product_id;
  let count = req.body.count;
  let total_prices = 0;
  productModel.getMultipleProductPrice(product_id).then(([rows, metadata]) => {
    for (let i = 0; i < rows.length; i++) {
      total_prices += rows[i].price * count[i];
      console.log(total_prices);
    }
    // creating order
    orderModel
      .createOrder(req.user.id, total_prices)
      .then((order) => {
        let order_id = order[0].insertId;
        // adding product to order
        const data = [];
        for (let i = 0; i < req.body.product_id.length; i++) {
          data.push([order_id, req.body.product_id[i], req.body.count[i]]);
        }
        orderModel
          .addProductToOrder(data)
          .then(() => res.status(200).json({ message: "order created" }))
          .catch((err) => res.status(400).send({ message: err }));
      })
      .catch((err) =>
        res.status(400).send({
          message: err,
        })
      );
  });
};

module.exports.deleteOrder = (req, res, next) => {
  orderModel
    .deleteOrderID(req.params.id)
    .then(
      orderModel
        .deleteProductFromOrder(req.params.id)
        .then(() => res.status(200).json({ message: "order deleted" }))
        .catch((err) =>
          res.status(400).send({
            message: err,
          })
        )
    )
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.updateOrder = (req, res, next) => {
  orderModel
    .updateOrder(req.params.id, req.body.name, req.body.price, req.body.details)
    .then(res.status(200).json({ message: "order updated" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};
