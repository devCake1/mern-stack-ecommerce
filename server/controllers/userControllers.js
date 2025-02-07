const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signIn = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.find({ email, password }, { password: 0 });
    if (user.length > 0) {
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

module.exports = { signIn };
