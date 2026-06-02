const { Listing } = require('../models/listing');
const ExpressError = require('../utils/ExpressError');

// Index
module.exports.index = async (req, res) => {
  let { search } = req.query;
  let query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { country: { $regex: search, $options: 'i' } },
    ];
  }
  const allListings = await Listing.find(query);
  res.render('listings/index', { allListings, searchQuery: search || '' });
};

// New
module.exports.renderNewForm = (req, res) => {
  res.render('listings/new');
};

// Create
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect('/listings');
};

// Show
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/show', { listing });
};

// Get Edit
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/edit', { listing });
};

// Update
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const updateListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
    returnDocument: 'after',
  });

  if (!updateListing) {
    throw new ExpressError(404, 'Listing not found');
  }
  res.redirect(`/listings/${id}`);
};

// Delete
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect('/listings');
};
