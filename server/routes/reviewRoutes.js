const express = require("express");
const { getReviews, addNewReview, deleteReview } = require("../controllers/reviewControllers");
const isLoggedIn = require("../utility/isLoggedIn");
const isAdmin = require("../utility/isAdmin");
const reviewRoutes = express.Router();

// POST: /api/reviews
reviewRoutes.post("/", isLoggedIn, addNewReview);

// GET: /api/reviews
reviewRoutes.get("/", getReviews);

// DELETE: /api/reviews/:reviewId
reviewRoutes.delete("/:reviewId", isLoggedIn, isAdmin, deleteReview);

module.exports = reviewRoutes;
