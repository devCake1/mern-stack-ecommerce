const User = require("../models/userModel");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.headers.userid;
    const user = await User.findOne({ _id: userId }, { isAdmin: 1 });
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).send({
        message: "Sorry! User is not an admin. Please login as an admin",
        isSuccessful: false
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = isAdmin;
