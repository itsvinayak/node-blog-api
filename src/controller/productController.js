const productModel = require("../models/product");

module.exports.getSingleProduct = (req, res, next) => {
  productModel
    .getSingleProductData(req.params.id)
    .then(([rows, metadata]) => res.status(200).json(JSON.stringify(rows[0])))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.getAllProducts = (req, res, next) => {
  productModel
    .getAllProductsData()
    .then(([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.addProduct = (req, res, next) => {
  productModel
    .createProduct(req.body.name, req.body.price, req.body.details)
    .then(res.status(201).json({ message: "product created" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.deleteProduct = (req, res, next) => {
  productModel
    .deleteProduct(req.params.id)
    .then(res.status(200).json({ message: "product deleted" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.updateProduct = (req, res, next) => {
  productModel
    .updateProduct(
      req.params.id,
      req.body.name,
      req.body.price,
      req.body.details
    )
    .then(res.status(200).json({ message: "product updated" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};
