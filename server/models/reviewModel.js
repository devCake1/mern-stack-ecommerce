const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  imgPath: {
    type: String,
    default: ""
  },
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"]
  },
  comment: {
    type: String,
    required: [true, "Comment is required"]
  }
}, { timestamps: true });

const Review = new model("Review", reviewSchema);

module.exports = Review;
