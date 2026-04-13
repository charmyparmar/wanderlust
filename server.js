const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { Listing } = require('./models/listing');
require('dotenv').config();

const PORT = process.env.PORT;

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.send('Hi, I am root');
});

app.get('/testListing', async (req, res) => {
  let sampleListing = new Listing({
    title: 'New villa',
    description: 'On mountain',
    price: 5000,
    location: 'London',
    country: 'UK',
  });
  await sampleListing.save();
  console.log('Sample is saved');
  res.send('successful testing');
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
