const express = require("express");
const { signIn } = require("../controllers/userControllers");
const userRoutes = express.Router();

// POST: /api/users/sign-in
userRoutes.post("/sign-in", signIn);

module.exports = userRoutes;
