const categoryModel = require("../models/category");

//retrives all the existing categories in the db
module.exports.getAllCategories = (req, res) => {
  categoryModel
    .getAllCategoriesData()
    .then(([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

//retrives the products of a specific category using category id
module.exports.getSingleCategory = (req, res) => {
  categoryModel
    .getSingleCategoryData(req.params.id)
    .then(([rows, metadata]) => res.status(200).json(JSON.stringify(rows)))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

//adds a new category to the database taking the name and details of it
module.exports.addCategory = (req, res) => {
  categoryModel
    .createCategory(req.body.name, req.body.details)
    .then(res.status(201).json({ message: "A new category has been added successfully" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

//updates an existing category by taking in new name and details and checking with the category id provided
module.exports.updateCategory = (req, res) => {
  categoryModel
    .updateCategory(req.params.id, req.body.name, req.body.details)
    .then(res.status(200).json({ message: "category has been updated successfully" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};

//deletes an existing category using category id passed to it
module.exports.deleteCategory = (req, res) => {
  categoryModel
    .deleteCategory(req.params.id)
    .then(res.status(200).json({ message: "category has been deleted successfully" }))
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};
