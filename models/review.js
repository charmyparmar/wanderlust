const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment is required'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'rating is required'],
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = { Review };
