const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.signintoken, process.env.SIGNIN_KEY);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isLoggedIn;
