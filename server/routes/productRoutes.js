const express = require("express");
const { getProducts } = require("../controllers/productControllers");
const productRoutes = express.Router();

// GET: /api/products
productRoutes.get("/", getProducts);

module.exports = productRoutes;
