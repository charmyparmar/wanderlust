const User = require('../models/user');

// Toggle wishlist
module.exports.toggleWishlist = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'You must be logged in to wishlist properties.' });
  }

  const { id } = req.params;
  const user = await User.findById(req.user._id);

  const listingIndex = user.wishlist.indexOf(id);
  let added;

  if (listingIndex === -1) {
    user.wishlist.push(id);
    added = true;
  } else {
    user.wishlist.splice(listingIndex, 1);
    added = false;
  }

  await user.save();
  res.json({ added, count: user.wishlist.length });
};

// Render user's wishlist page
module.exports.renderWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.render('listings/wishlist', { wishlist: user.wishlist });
};
