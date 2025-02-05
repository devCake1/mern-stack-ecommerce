const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to MERN-STACK-ECOMMERCE");
});

app.use("/api/categories", categoryRoutes);

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
