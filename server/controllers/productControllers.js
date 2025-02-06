const Product = require("../models/productModel");

const getProducts = async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    let search = req.query.search;
    let searchRegexp = null;
    let filter = {};
    if (search) {
      searchRegexp = new RegExp(`.*${search}.*`, "i");
      filter = {
        $or: [
          { productName: { $regex: searchRegexp } },
          { category: { $regex: searchRegexp } }
        ]
      }
    }
    const products = await Product.find(filter).skip((page - 1) * limit).limit(limit);
    if (products.length > 0) {
      res.status(200).send({
        products,
        totalPages: Math.ceil(products.length / limit),
        message: "",
        isSuccessful: true
      });
    } else {
      res.status(200).send({
        message: "No items found",
        isSuccessful: false
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts };
