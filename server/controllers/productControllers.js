const Product = require("../models/productModel");

const getProducts = async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const search = req.query.search;
    let searchRegexp = null;
    let filter = {};
    let countProducts = 0;
    if (search) {
      searchRegexp = new RegExp(`.*${search}.*`, "i");
      filter = {
        $or: [
          { productName: { $regex: searchRegexp } },
          { category: { $regex: searchRegexp } }
        ]
      };
      countProducts = await Product.find(filter).countDocuments();
    } else {
      countProducts = await Product.find().countDocuments();
    }
    const products = await Product.find(filter).skip((page - 1) * limit).limit(limit);
    if (products.length > 0) {
      res.status(200).send({
        products,
        totalPages: Math.ceil(countProducts / limit),
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
