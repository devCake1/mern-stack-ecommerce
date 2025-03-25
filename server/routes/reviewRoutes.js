const express = require("express");
const { getReviews, addNewReview } = require("../controllers/reviewControllers");
const isLoggedIn = require("../utility/isLoggedIn");
const reviewRoutes = express.Router();

// POST: /api/reviews
reviewRoutes.post("/", isLoggedIn, addNewReview);

// GET: /api/reviews
reviewRoutes.get("/", getReviews);

module.exports = reviewRoutes;
