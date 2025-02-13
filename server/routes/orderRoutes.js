const express = require("express");
const { newOrder } = require("../controllers/orderControllers");
const isLoggedIn = require("../utility/isLoggedIn");
const orderRoutes = express.Router();

// POST: /api/orders
orderRoutes.post("/", isLoggedIn, newOrder);

module.exports = orderRoutes;
