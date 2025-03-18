const Review = require("../models/reviewModel");
const User = require("../models/userModel");

const getReviews = async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = 3;
    const reviews = await Review.find().skip((page - 1) * limit).limit(limit);
    const countReviews = await Review.find().countDocuments();
    for (let i = 0; i < reviews.length; i++) {
      const user = await User.findOne({ email: reviews[i].email }, { imgPath: 1 });
      reviews[i].imgPath = user.imgPath;
    }
    res.status(200).send({
      reviews,
      totalPages: Math.ceil(countReviews / limit),
      message: "",
      isSuccessful: true
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getReviews };
