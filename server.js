const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
require('dotenv').config();

const listingsRoutes = require('./routes/listings');

const PORT = process.env.PORT;
const database_url = process.env.MONGO_URL;

// DB
mongoose
  .connect(database_url)
  .then(() => console.log('connected to DB'))
  .catch((err) => console.log(err));

// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.get('/', (req, res) => {
  res.send('Hi, I am root');
});

app.use('/listings', listingsRoutes);

app.use((req, res, next) => {
  next(new ExpressError(404, 'Page not Found!!'));
});

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send(err.message);
  }
  let { statusCode = 500, message = 'Something went wrong!!' } = err;
  res.status(statusCode).render('Error.ejs', { err });
});

// Server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
