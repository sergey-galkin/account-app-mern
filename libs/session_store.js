// const session = require('express-session');
const MongoStore = require('connect-mongo');
const uri = process.env.DATABASE_SESSION_URL;
console.log(uri);

const sessionStore = MongoStore.create(
  {
    mongoUrl: process.env.DATABASE_SESSION_URL,
    ttl: 7 * 24 * 60 * 60,
  }
);

module.exports = sessionStore;