const categoryModel = require("../models/category");

module.exports.getAllCategories = (req, res) => {
  categoryModel
    .getAllCategoriesData()
    .then( ([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
    .catch((err) =>
      res.status(400).send({
        message: err
      })
    )
}

module.exports.getSingleCategory = (req, res) => {
  categoryModel
    .getSingleCategoryData(req.params.id)
    .then( ([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
    .catch((err) =>
      res.status(400).send({
        message: err
      })
    )
}

module.exports.addCategory = (req, res) => {
  categoryModel
    .createCategory(req.body.name, req.body.details)
    .then(res.status(201).json({ message: "category created" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

module.exports.updateCategory = (req, res) => {
  categoryModel
  .updateCategory(req.params.id, req.body.name, req.body.details)
  .then(res.status(200).json({ message: "category updated" }))
  .catch((err) =>
    res.status(400).send({
      message: err,
    })
  );
};

module.exports.deleteCategory = (req, res) => {
    categoryModel
    .deleteCategory(req.params.id)
    .then(res.status(200).json({ message: "category deleted" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};


