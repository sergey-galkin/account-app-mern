const mongoose = require('mongoose');
const crypto = require('node:crypto');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  birthday: {
    day: String,
    month: String,
    year: String,
  },
  sex: {
    type: String,
  },
});

userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha512', 'top secret').update(this.salt).update(password).digest('hex');
};

userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

userSchema.statics.checkLogin = function(name, cb) {
  return this.findOne({ name: new RegExp('^' + name + '$', 'i')}, cb);
};

userSchema.virtual('password')
  .set(function (password) {
    this.hashedPassword = this.encryptPassword(password);
});

const User = mongoose.model('User', userSchema);


exports.User = User;