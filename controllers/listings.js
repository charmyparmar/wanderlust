const { Listing } = require('../models/listing');

// Index
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index', { allListings });
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

// Edit
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/edit', { listing });
};

// Update
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/listings/${id}`);
};

// Delete
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect('/listings');
};
