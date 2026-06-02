const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');
const { saveRedirectUrl, isLoggedIn } = require('../middleware');

router.route('/signup').get(userController.renderSignupForm).post(userController.signup);

router
  .route('/login')
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true,
    }),
    userController.login
  );

router
  .route('/profile')
  .get(isLoggedIn, userController.renderProfile)
  .put(isLoggedIn, userController.updateProfile);

router.get('/mylistings', isLoggedIn, userController.renderMyListings);

router.get('/logout', userController.logout);

module.exports = router;
