const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  category: {
    type: String,
    required: [true, "Category is required"]
  }
});

const Category = new model("Category", categorySchema);

module.exports = Category;
