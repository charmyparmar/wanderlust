const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listings');
const { listingSchema } = require('../utils/validator/schema');
const ExpressError = require('../utils/ExpressError');
const wrapAsync = require('../utils/wrapAsync');

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((e) => e.message).join(',');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Index
router.get('/', wrapAsync(listingsController.index));

// Create
router.post('/', validateListing, wrapAsync(listingsController.createListing));

// New form
router.get('/new', listingsController.renderNewForm);

// Update
router.patch('/:id', validateListing, wrapAsync(listingsController.updateListing));

// Show, Delete
router
  .route('/:id')
  .get(wrapAsync(listingsController.showListing))
  .delete(wrapAsync(listingsController.deleteListing));

// Edit form
router.get('/:id/edit', wrapAsync(listingsController.renderEditForm));

module.exports = router;
