const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  cart: [],
  total: Number,
  payment: Boolean,
  shippingStatus: Boolean
}, { timestamps: true });

const Order = new model("Order", orderSchema);

module.exports = Order;
