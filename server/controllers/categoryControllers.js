const Category = require("../models/categoryModel");

const getCategories = async (req, res, next) => {
  try {
    let categories = [];
    if (JSON.stringify(req.query) !== "{}") {
      categories = await Category.find().limit(req.query.limit);
    } else {
      categories = await Category.find();
    }
    res.status(200).send({
      categories,
      message: "",
      isSuccessful: true
    });
  } catch(err) {
    next(err);
  }
};

const addNewCategory = async (req, res, next) => {
  try {
    const newCategory = req.body.newCategory;
    const newCategoryData = new Category({
      category: newCategory
    });
    await newCategoryData.save();
    res.status(200).send({
      message: "New category has been added successfully",
      isSuccessful: true
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    await Category.deleteOne({ _id: categoryId });
    res.status(200).send({
      message: "The category has been deleted successfully",
      isSuccessful: true
    })
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories, addNewCategory, deleteCategory };
