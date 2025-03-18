const express = require("express");
const { getReviews } = require("../controllers/reviewControllers");
const reviewRoutes = express.Router();

// GET: /api/reviews
reviewRoutes.get("/", getReviews);

module.exports = reviewRoutes;
