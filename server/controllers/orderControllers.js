const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const newOrder = async (req, res, next) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      cart: req.body.cart,
      total: req.body.total,
      payment: req.body.payment,
      shippingStatus: false
    });
    await newOrder.save();
    res.status(200).send({
      message: "Thank you for placing an order",
      isSuccessful: true
    })
  } catch (err) {
    next(err);
  }
};

const myOrders = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const shippingStatus = req.params.shippingStatus;
    const page = req.params.page;
    const result = await Order.find({ $and: [{ userId: userId }, { shippingStatus: shippingStatus }] }).skip((page - 1) * 10).limit(10);
    const countResult = await Order.find({ $and: [{ userId: userId }, { shippingStatus: shippingStatus }] }).countDocuments();
    res.status(200).send({
      result,
      totalPages: Math.ceil(countResult / 10),
      message: "",
      isSuccessful: true
    });
  } catch (err) {
    next(err);
  }
};

const allOrders = async (req, res, next) => {
  try {
    const shippingStatus = req.params.shippingStatus;
    const page = req.params.page;
    const orders = await Order.find({ shippingStatus: shippingStatus }).skip((page - 1) * 10).limit(10);
    const countOrders = await Order.find({ shippingStatus: shippingStatus }).countDocuments();
    res.status(200).send({
      orders,
      totalPages: Math.ceil(countOrders / 10),
      message: "",
      isSuccessful: true
    })
  } catch (err) {
    next(err);
  }
};

const deliverOrder = async (req, res, next) => {
  try {
    let isInSufficient = false;
    const cart = req.body.cart;
    const orderId = req.body._id;
    for (let i = 0; i < cart.length; i++) {
      const product = await Product.findOne({ _id: cart[i]._id }, { _id: 0, inStock: 1 });
      if (product.inStock < cart[i].quantity) {
        isInSufficient = true;
        break;
      }
    }
    if (isInSufficient) {
      res.status(200).send({
        message: "Insufficient product in-stock",
        isSuccessful: false
      });
    } else {
      for (let i = 0; i < cart.length; i++) {
        const product = await Product.findOne({ _id: cart[i]._id }, { _id: 0, inStock: 1 });
        let remainingQuantity = product.inStock - cart[i].quantity;
        await Product.findOneAndUpdate({ _id: cart[i]._id }, { $set: { inStock: remainingQuantity } });
      }
      await Order.findOneAndUpdate({ _id: orderId }, { $set: { shippingStatus: true } });
      res.status(200).send({
        message: "Order has been delivered successfully",
        isSuccessful: true
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { newOrder, myOrders, allOrders, deliverOrder };
