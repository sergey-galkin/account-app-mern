const MongoStore = require('connect-mongo');

const sessionStore = MongoStore.create(
  {
    mongoUrl: process.env.DATABASE_SESSION_URL,
    ttl: 7 * 24 * 60 * 60,
  }
);

module.exports = sessionStore;