const express = require("express");
const multer = require("multer");
const { getProducts, getSingleProduct, changeProductImage, updateProductData, addNewProduct } = require("../controllers/productControllers");
const isLoggedIn = require("../utility/isLoggedIn");
const isAdmin = require("../utility/isAdmin");
const productRoutes = express.Router();

// const upload = multer({ dest: './uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + file.originalname)
  }
});

const upload = multer({ storage: storage });

// POST: /api/products
productRoutes.post("/", isLoggedIn, isAdmin, upload.single("productImage"), addNewProduct);

// GET: /api/products
productRoutes.get("/", getProducts);

// GET: /api/products/:productId
productRoutes.get("/:productId", getSingleProduct);

// PUT: /api/products/change-product-image
productRoutes.put("/change-product-image", isLoggedIn, isAdmin, upload.single("productImage"), changeProductImage);

// PUT: /api/products/update-product-data
productRoutes.put("/update-product-data", isLoggedIn, isAdmin, updateProductData);

module.exports = productRoutes;
