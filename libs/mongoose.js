const mongoose = require('mongoose');
const { DATABASE_URL, DATABASE_OPTIONS } = process.env;

mongoose.connect(DATABASE_URL, DATABASE_OPTIONS, (err) => {
  if (err) console.error(err);
});