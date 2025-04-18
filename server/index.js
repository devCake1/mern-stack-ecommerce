const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();
const port = 3000;

require("dotenv").config();

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to MERN-STACK-ECOMMERCE");
});

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
  const err = new Error("404 not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message || "Sorry, something went wrong",
    isSuccessful: false
  });
});

app.listen(port, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB");
  } catch (err) {
    console.log(err);
  } finally {
    console.log(`Server running at http://localhost:${port}`);
  }
});
