const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listings');

// Index, Create
router.route('/').get(listingsController.index).post(listingsController.createListing);

// New form
router.get('/new', listingsController.renderNewForm);

// Show, Update, Delete
router
  .route('/:id')
  .get(listingsController.showListing)
  .patch(listingsController.updateListing)
  .delete(listingsController.deleteListing);

// Edit form
router.get('/:id/edit', listingsController.renderEditForm);

module.exports = router;
