const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  imgPath: {
    type: String,
    required: [true, "Product image is required"]
  },
  productName: {
    type: String,
    required: [true, "Product name is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  category: {
    type: String,
    required: [true, "Category is required"]
  },
  discount: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  inStock: {
    type: Number,
    required: [true, "In-stock quantity is required"]
  }
});

const Product = new model("Product", productSchema);

module.exports = Product;
