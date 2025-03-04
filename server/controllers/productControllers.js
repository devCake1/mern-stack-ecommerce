const fs = require("fs");
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

const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({  _id: req.params.productId });
    res.status(200).send({
      product,
      message: "",
      isSuccessful: true
    })
  } catch (err) {
    next(err)
  }
};

const changeProductImage = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const imgPath = `uploads/${req.file.filename}`;
    const prevImgPath = await Product.findOne({ _id: productId }, { _id: 0, imgPath: 1 });
    if (prevImgPath.imgPath) {
      fs.unlink(prevImgPath.imgPath, (err) => {
        if (err) {
          next(err);
        } else {
          console.log(`${prevImgPath.imgPath} was deleted`);
        }
      });
    }
    await Product.findOneAndUpdate({ _id: productId }, { $set: { imgPath: imgPath } });
    res.status(200).send({
      imgPath,
      message: "New product image uploaded successfully",
      isSuccessful: true
    })
  } catch (err) {
    next(err);
  }
};

const updateProductData = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const productName = req.body.productName;
    const description = req.body.description;
    const category = req.body.category;
    const discount = parseInt(req.body.discount);
    const price = parseInt(req.body.price);
    const inStock = parseInt(req.body.inStock);
    await Product.findOneAndUpdate({ _id: productId }, { $set: {
      productName: productName,
      description: description,
      category: category,
      discount: discount,
      price: price,
      inStock: inStock
    } });
    res.status(200).send({
      message: "Product data has been updated successfully",
      isSuccessful: true
    })
  } catch (err) {
    next(err);
  }
};

const addNewProduct = async (req, res, next) => {
  try {
    const imgPath = `uploads/${req.file.filename}`;
    const productName = req.body.productName;
    const description = req.body.description;
    const category = req.body.category;
    const discount = parseInt(req.body.discount);
    const price = parseInt(req.body.price);
    const inStock = parseInt(req.body.inStock);
    const newProduct = new Product({
      imgPath,
      productName,
      description,
      category,
      discount,
      price,
      inStock
    });
    await newProduct.save();
    res.status(200).send({
      message: "New product has been added successfully",
      isSuccessful: true
    })
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await Product.deleteOne({ _id: productId });
    res.status(200).send({
      message: "The product has been deleted successfully",
      isSuccessful: true
    })
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts, getSingleProduct, changeProductImage, updateProductData, addNewProduct, deleteProduct };
