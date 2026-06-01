const express = require('express');
const router = express.Router({ mergeParams: true });
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../utils/validator/schema');

const reviewController = require('../controllers/review');
const { Listing } = require('../models/listing');

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((e) => e.message).join(',');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router.post('/', validateReview, reviewController.createReview);

router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
