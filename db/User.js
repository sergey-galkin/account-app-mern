const mongoose = require('../libs/mongoose');
const crypto = require('node:crypto');

const userSchema = new mongoose.Schema({
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
  birthday: Date,
  sex: String,
  photoFileName: String,
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