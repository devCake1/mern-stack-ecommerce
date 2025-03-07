const express = require("express");
const multer = require("multer");
const { signIn, signUp, changeProfilePicture, updateProfileInfo, changePassword } = require("../controllers/userControllers");
const isLoggedIn = require("../utility/isLoggedIn");
const userRoutes = express.Router();

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

// POST: /api/users/sign-in
userRoutes.post("/sign-in", signIn);

// POST: /api/users/sign-up
userRoutes.post("/sign-up", signUp);

// PUT: /api/users/change-profile-picture
userRoutes.put("/change-profile-picture", isLoggedIn, upload.single("profilePicture"), changeProfilePicture);

// PUT: /api/users/update-profile-info
userRoutes.put("/update-profile-info", isLoggedIn, updateProfileInfo);

// PUT: /api/users/change-password
userRoutes.put("/change-password", isLoggedIn, changePassword);

module.exports = userRoutes;
