const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const session = require('express-session');
const routes = require("./routes");

const cwd = process.cwd();
const envFileName = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({path: path.join(cwd, envFileName)});

const app = express();

app.use(express.json());
app.use(session({
  secret: process.env.DATABASE_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  store: require('./libs/session_store'),
}));

const staticFolder = path.join(cwd, 'public');
app.use('/', express.static(staticFolder));

routes(app);

app.listen(process.env.APP_PORT);