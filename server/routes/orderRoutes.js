const express = require("express");
const { newOrder, myOrders } = require("../controllers/orderControllers");
const isLoggedIn = require("../utility/isLoggedIn");
const orderRoutes = express.Router();

// POST: /api/orders
orderRoutes.post("/", isLoggedIn, newOrder);

// GET: /api/orders/:userId/:shippingStatus/:page
orderRoutes.get("/:userId/:shippingStatus/:page", isLoggedIn, myOrders);

module.exports = orderRoutes;
