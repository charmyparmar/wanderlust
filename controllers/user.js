const crypto = require('crypto');
const User = require('../models/user');
const { Listing } = require('../models/listing');
const { sendVerificationEmail } = require('../utils/mailer');

module.exports.renderSignupForm = (req, res) => {
  res.render('users/signup.ejs');
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    // Generate secure random verification token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpires = Date.now() + 24 * 6600000; // 24 Hours

    const newUser = new User({
      email,
      username,
      verificationToken: token,
      verificationTokenExpires: tokenExpires,
    });

    const registeredUser = await User.register(newUser, password);

    // Send verification email in background
    const origin = `${req.protocol}://${req.get('host')}`;
    sendVerificationEmail(email, username, token, origin).catch((err) => {
      console.error('Failed to send verification email:', err);
    });

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash(
        'success',
        'Welcome to WanderLust! We have sent a verification link to your email.'
      );
      res.redirect('/listings');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/signup');
  }
};

module.exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      req.flash('error', 'Verification link is invalid or has expired.');
      return res.redirect('/profile');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    if (!req.isAuthenticated()) {
      req.login(user, (err) => {
        if (err) return next(err);
        req.flash('success', 'Email verified successfully! Welcome to WanderLust!');
        return res.redirect('/profile');
      });
    } else {
      req.flash('success', 'Email verified successfully!');
      res.redirect('/profile');
    }
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/profile');
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
