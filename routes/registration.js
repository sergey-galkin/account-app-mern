const path = require('path');
const User = require('../db/user').User;
const { tmpDirPath, photoDirPath, noPhotoFileName } = require('../config/config');
const storePhoto = require('../libs/photoHandler');
const validation = require('../libs/validation');
const { removeFile } = require('../libs/fileSystem');

const registration = async (req, res, next) => {
  const photoFileName = req.file?.filename || '';
  const tmpPhotoSrc = photoFileName ? path.join(tmpDirPath, photoFileName) : '';

  const checks = checkRegData(req.body);
  if (!checks.status) {
    removeFile(tmpPhotoSrc);
    return res.send(checks);
  }

  let duplicateUser;
  try {
    duplicateUser = await User.findOne({email: req.body.email.toLowerCase()})
  } catch (error) {
    removeFile(tmpPhotoSrc);
    return next(error);
  }

  if (duplicateUser) {
    removeFile(tmpPhotoSrc);
    res.send({
      status: false,
      warnings: {
        email: 'User with specified email is already exist'
      }
    });
    return;
  } 

  let handledPhotoFileName = '';
  let handledPhotoSrc;
  let isPhotoStored = false;
  if (photoFileName) {
    handledPhotoFileName = path.parse(photoFileName).name + '.webp';
    handledPhotoSrc = path.join(photoDirPath, handledPhotoFileName);
    isPhotoStored = await storePhoto(tmpPhotoSrc, handledPhotoSrc);
  }

  const user = new User({
    name: req.body.name,
    salt: Math.random() + '',
    password: req.body.password,
    email: req.body.email,
    birthDate: req.body.birthDate,
    sex: req.body.sex,
    photoFileName: isPhotoStored ? handledPhotoFileName : noPhotoFileName,
  });
  
  try {
    await user.save();
  } catch (error) {
    if (error) {
      removeFile(tmpPhotoSrc);
      removeFile(handledPhotoSrc);
      return next(error);
    }
  }

  res.send({
    status: true,
    message: 'User created'
  });
};

function checkRegData({ name, password, repeatedPassword, email, birthDate, sex }) {
  let status = true;
  const warnings = {
    name: validation.checkName(name),
    password: validation.checkPassword(password),
    repeatedPassword: validation.checkRepeatedPassword(password, repeatedPassword),
    email: validation.checkEmail(email),
    sex: validation.checkSex(sex),
    birthDate: validation.checkBirthDate(birthDate),
  };

  if (Object.values(warnings).find(v => v)) status = false;

  return {status, warnings};
};

module.exports = registration;
