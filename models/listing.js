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
      type: String,
      default:
        'https://images.unsplash.com/photo-1697807646004-31ae73a1a625?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      set: (v) => (v === '' ? '' : v),
      required: [true, 'Image is required'],
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
