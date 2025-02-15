const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/userModel");

const signIn = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email, password }, { password: 0 });
    if (user) {
      const signInToken = jwt.sign({ usreId: user._id }, process.env.SIGNIN_KEY, { expiresIn: "1m" });
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
      message: "New profile profile picture uploaded successfully",
      isSuccessful: true
    })
  } catch (err) {
    next(err);
  }
};

module.exports = { signIn, changeProfilePicture };
