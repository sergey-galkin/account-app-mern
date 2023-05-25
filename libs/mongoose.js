const mongoose = require('mongoose');
const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL)
  .catch(error => {
    console.error('ERROR');
    console.error(error);
  })
;

module.exports = mongoose