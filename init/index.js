require('dotenv').config({ path: './.env' }); // if run from workspace root
require('dotenv').config({ path: '../.env' }); // if run from init directory
const mongoose = require('mongoose');
const initData = require('./data.js');
const { Listing } = require('../models/listing.js');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/wanderlust';

main()
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
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
