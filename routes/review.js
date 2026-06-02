const express = require('express');
const router = express.Router({ mergeParams: true });
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../utils/validator/schema');

const reviewController = require('../controllers/review');
const { Listing } = require('../models/listing');
const { isLoggedIn, isReviewAuthor } = require('../middleware');

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((e) => e.message).join(',');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router.post('/', isLoggedIn, validateReview, reviewController.createReview);

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;
