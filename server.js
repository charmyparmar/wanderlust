const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
require('dotenv').config();
const MongoStore = require('connect-mongo').MongoStore;

const listingsRoutes = require('./routes/listings');
const reviewsRoutes = require('./routes/review');
const userRoutes = require('./routes/user');

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

const store = MongoStore.create({
  mongoUrl: database_url,
  crypto: {
    secret: 'mysupersecretcode',
  },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  store,
  secret: 'mysupersecretcode',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 8 * 60 * 60 * 1000,
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.redirect('/listings');
});

app.use('/', userRoutes);
app.use('/listings', listingsRoutes);
app.use('/listings/:id/reviews', reviewsRoutes);

app.use((req, res, next) => {
  next(new ExpressError(404, 'Page not Found!!'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send(err.message);
  }
  let { statusCode = 500 } = err;
  res.status(statusCode).render('Error.ejs', { err });
});

// Server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
