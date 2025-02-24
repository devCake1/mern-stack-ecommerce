const express = require("express");
const { newOrder, myOrders, allOrders, deliverOrder } = require("../controllers/orderControllers");
const isLoggedIn = require("../utility/isLoggedIn");
const isAdmin = require("../utility/isAdmin");
const orderRoutes = express.Router();

// POST: /api/orders
orderRoutes.post("/", isLoggedIn, newOrder);

// GET: /api/orders/:userId/:shippingStatus/:page
orderRoutes.get("/:userId/:shippingStatus/:page", isLoggedIn, myOrders);

// GET: /api/orders/:shippingStatus/:page
orderRoutes.get("/:shippingStatus/:page", isLoggedIn, isAdmin, allOrders);

// PUT: /api/orders/deliver-order
orderRoutes.put("/deliver-order", isLoggedIn, isAdmin, deliverOrder);

module.exports = orderRoutes;
