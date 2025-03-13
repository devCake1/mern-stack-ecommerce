const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/userModel");

const signIn = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email, password }, { password: 0 });
    if (user) {
      const signInToken = jwt.sign({ usreId: user._id }, process.env.SIGNIN_KEY, { expiresIn: "8h" });
      res.status(200).send({
        user,
        signInToken,
        message: "",
        isSuccessful: true
      });
    } else {
      res.status(200).send({
        message: "Email or password is incorrect",
        isSuccessful: false
      });
    }
  } catch (err) {
    next(err);
  }
};

const signUp = async (req, res, next) => {
  try {
    const imgPath = "";
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (user !== null) {
      res.status(200).send({
        message: "An account with this email already exists. Please enter another email",
        isSuccessful: false
      });
    } else {
      const newUser = new User({ imgPath, firstName, lastName, email, password });
      await newUser.save();
      res.status(201).send({
        message: "Your account has been successfully created",
        isSuccessful: true
      });
    }
  } catch (err) {
    next(err)
  }
};

const changeProfilePicture = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const imgPath = `uploads/${req.file.filename}`;
    const prevImgPath = await User.findOne({ _id: userId }, { _id: 0, imgPath: 1 });
    if (prevImgPath.imgPath) {
      fs.unlink(prevImgPath.imgPath, (err) => {
        if (err) {
          next(err);
        } else {
          console.log(`${prevImgPath.imgPath} was deleted`);
        }
      });
    }
    await User.findOneAndUpdate({ _id: userId }, { $set: { imgPath: imgPath } });
    res.status(200).send({
      imgPath,
      message: "New profile picture uploaded successfully",
      isSuccessful: true
    })
  } catch (err) {
    next(err);
  }
};

const updateProfileInfo = async (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const userId = req.body.userId;
    await User.findOneAndUpdate({ _id: userId }, { $set: { firstName: firstName, lastName: lastName, email: email } });
    const user = await User.findOne({ _id: userId }, { password: 0 });
    res.status(200).send({
      user,
      message: "Your profile info has been updated successfully",
      isSuccessful: true
    });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const userId = req.body.userId;
    const user = await User.findOne({ $and: [{ _id: userId }, { password: currentPassword }] }, { _id: 1 });
    console.log(user);
    if (!user) {
      res.status(200).send({
        message: "Current password is not correct. Please try again",
        isSuccessful: false
      })
    } else {
      await User.findOneAndUpdate({ _id: userId }, { $set: { password: newPassword } })
      res.status(200).send({
        message: "Your password has been changed successfully",
        isSuccessful: true
      });
    }
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const role = req.query.role;
    let isAdmin = false;
    if (role === "Admin") {
      isAdmin = true;
    }
    let filter = { isAdmin: isAdmin };
    const users = await User.find(filter, { password: 0 }).skip((page - 1) * limit).limit(limit);
    res.status(200).send({
      users,
      message: "",
      isSuccessful: true
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email }, { password: 0 });
    if (user) {
      res.status(200).send({
        user,
        message: "",
        isSuccessful: true
      });
    } else {
      res.status(200).send({
        message: "No result found",
        isSuccessful: false
      })
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { signIn, signUp, changeProfilePicture, updateProfileInfo, changePassword, getAllUsers, getSingleUser };
