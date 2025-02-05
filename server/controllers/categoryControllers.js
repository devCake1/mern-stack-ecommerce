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

module.exports = { getCategories };
