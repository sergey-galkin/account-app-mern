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
  birthDate: Date,
  sex: String,
  photoFileName: String,
});

userSchema.statics.encryptPassword = encryptPassword;

userSchema.methods.checkPassword = function (password) {
  return encryptPassword(password, this.salt) === this.hashedPassword;
};

userSchema.virtual('password')
  .set(function (password) {
    this.hashedPassword = encryptPassword(password, this.salt);
});

const User = mongoose.model('User', userSchema);


function encryptPassword(password, salt) {
  return crypto.createHmac('sha512', 'top secret').update(salt).update(password).digest('hex');
};


exports.User = User;