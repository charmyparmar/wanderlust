const mongoose = require('mongoose');
const initData = require('./data');
const { Listing } = require('../models/listing');

require('dotenv').config();

const database_url = process.env.MONGO_URL;

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

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: '6a1cea7abf551ec1b1959e86',
  }));

  await Listing.insertMany(initData.data);
  console.log('data was initialized');
};

initDB();
