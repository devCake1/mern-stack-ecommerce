const Review = require("../models/reviewModel");
const User = require("../models/userModel");

const addNewReview = async (req, res, next) => {
  try {
    const newReview = new Review({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      rating: parseInt(req.body.ratingStars),
      comment: req.body.comment
    });
    await newReview.save();
    res.status(200).send({
      message: "Thanks for sharing your experience with us",
      isSuccessful: true
    })
  } catch(err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const reviews = await Review.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
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

const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    await Review.deleteOne({ _id: reviewId });
    res.status(200).send({
      message: "The review has been deleted successfully",
      isSuccessful: true
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addNewReview, getReviews, deleteReview };
