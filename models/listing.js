const mongoose = require('mongoose');
const Schemas = mongoose.Schema;
const { Review } = require('./review');

const listingSchema = new Schemas(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      url: String,
      filename: String,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Rooms',
        'Iconic Cities',
        'Mountains',
        'Castles',
        'Amazing Pools',
        'Camping',
        'Farms',
        'Arctic',
      ],
    },
    reviews: [
      {
        type: Schemas.Types.ObjectId,
        ref: 'Review',
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
    owner: {
      type: Schemas.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

listingSchema.post('findOneAndDelete', async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = { Listing };
