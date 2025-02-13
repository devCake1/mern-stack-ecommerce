const Order = require("../models/orderModel");

const newOrder = async (req, res, next) => {
  try {
    const newOrder = new Order({
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

module.exports = { newOrder };
