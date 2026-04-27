const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { Listing } = require('./models/listing');
require('dotenv').config();

const PORT = process.env.PORT;

const database_url = process.env.MONGO_URL;

// Database connection

main()
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(database_url);
}

// Express application setup

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

app.engine('ejs', ejsMate);

// Routes
app.get('/', (req, res) => {
  res.send('Hi, I am root');
});

app.get('/testListing', async (req, res) => {
  let sampleListing = new Listing({
    title: 'New villa',
    description: 'On mountain',
    price: 5000,
    location: 'London',
    country: 'UK',
  });
  await sampleListing.save();
  console.log('Sample is saved');
  res.send('successful testing');
});

// Index Route
app.get('/listings', async (req, res) => {
  try {
    const allListings = await Listing.find({});
    // render index.ejs
    res.render('listings/index', { allListings });
  } catch (err) {
    console.log(err);
    res.send('Error loading listings');
  }
});

// New Listing
app.get('/listings/new', (req, res) => {
  // render new.ejs
  res.render('listings/new');
});

// Create New Listing
app.post('/listings', async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();

  res.redirect('/listings');
});

// Edit Listing
app.get('/listings/:id/edit', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  // render edit.ejs
  res.render('listings/edit', { listing });
});

// Update

app.patch('/listings/:id', async (req, res) => {
  let { id } = req.params;

  const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
    new: true,
  });

  if (!updatedListing) {
    throw new ExpressError(404, 'Listing not found');
  }

  res.redirect(`/listings/${id}`);
});

// Show Listing Details
app.get('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  // render show.ejs
  res.render('listings/show', { listing });
});

// Delete Route
app.delete('/listings/:id', async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);

  res.redirect('/listings');
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
