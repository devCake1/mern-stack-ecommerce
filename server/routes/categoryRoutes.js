const express = require("express");
const { getCategories } = require("../controllers/categoryControllers");
const categoryRoutes = express.Router();

// GET: /api/categories
categoryRoutes.get("/", getCategories);

module.exports = categoryRoutes;
