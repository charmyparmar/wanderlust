const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listings');
const { listingSchema } = require('../utils/validator/schema');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isOwner } = require('../middleware');

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
router.get('/', listingsController.index);

// Create
router.post('/', isLoggedIn, validateListing, listingsController.createListing);

// New form
router.get('/new', isLoggedIn, listingsController.renderNewForm);

// Update
router.patch('/:id', isLoggedIn, isOwner, validateListing, listingsController.updateListing);

// Show, Delete
router
  .route('/:id')
  .get(listingsController.showListing)
  .delete(isLoggedIn, isOwner, listingsController.deleteListing);

// Edit form
router.get('/:id/edit', isLoggedIn, isOwner, listingsController.renderEditForm);

module.exports = router;
