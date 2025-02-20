const Order = require("../models/orderModel");

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
    const result = await Order.find({ $and: [{ userId: userId }, { shippingStatus: shippingStatus }] }).skip(page - 1).limit(20);
    const countResult = await Order.find({ $and: [{ userId: userId }, { shippingStatus: shippingStatus }] }).countDocuments();
    res.status(200).send({
      result,
      totalPages: Math.ceil(countResult / 20),
      message: "",
      isSuccessful: true
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { newOrder, myOrders };
