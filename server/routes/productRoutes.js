const express = require("express");
const { getProducts, getSingleProduct } = require("../controllers/productControllers");
const productRoutes = express.Router();

// GET: /api/products
productRoutes.get("/", getProducts);

// GET: /api/products/:productId
productRoutes.get("/:productId", getSingleProduct);

module.exports = productRoutes;
