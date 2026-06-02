const User = require('../models/user');
const { Listing } = require('../models/listing');

module.exports.renderSignupForm = (req, res) => {
  res.render('users/signup.ejs');
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Welcome to WanderLust!');
      res.redirect('/listings');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/signup');
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render('users/login.ejs');
};

module.exports.login = async (req, res) => {
  req.flash('success', 'Welcome back to WanderLust!');
  let redirectUrl = res.locals.redirectUrl || '/listings';
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You have logged out successfully!');
    res.redirect('/listings');
  });
};

module.exports.renderProfile = (req, res) => {
  res.render('users/profile.ejs');
};

module.exports.renderMyListings = async (req, res) => {
  const myListings = await Listing.find({ owner: req.user._id });
  res.render('users/mylistings.ejs', { myListings });
};

module.exports.updateProfile = async (req, res) => {
  try {
    let { email, avatar } = req.body;
    await User.findByIdAndUpdate(req.user._id, { email, avatar }, { runValidators: true });
    req.flash('success', 'Profile updated successfully!');
    res.redirect('/profile');
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/profile');
  }
};
