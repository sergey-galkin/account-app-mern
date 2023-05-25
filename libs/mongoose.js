const mongoose = require('mongoose');
const { DATABASE_URL, DATABASE_OPTIONS } = process.env;

// try {
//   mongoose.connect(DATABASE_URL, DATABASE_OPTIONS)
//   console.log('MongoDB connecting');
// } catch (error) {
//   if (error) console.error(error);
// }

console.log('MongoDB connecting');
mongoose.connect(DATABASE_URL)
  .catch(error => {
    console.error('ERROR');
    console.error(error);
  })
;

// if (db) console.log('MongoDB is connected');
// else {
//   console.error('ERROR');
//   console.log(db);
// }

module.exports = mongoose