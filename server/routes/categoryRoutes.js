const express = require("express");
const { getCategories, addNewCategory, deleteCategory } = require("../controllers/categoryControllers");
const isLoggedIn = require("../utility/isLoggedIn");
const isAdmin = require("../utility/isAdmin");
const categoryRoutes = express.Router();

// GET: /api/categories
categoryRoutes.get("/", getCategories);

// POST: /api/categories
categoryRoutes.post("/", isLoggedIn, isAdmin, addNewCategory);

// DELETE: /api/categories/:categoryId
categoryRoutes.delete("/:categoryId", isLoggedIn, isAdmin, deleteCategory);

module.exports = categoryRoutes;
