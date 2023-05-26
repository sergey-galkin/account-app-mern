const path = require('path');
const { tmpDirPath, noPhotoFileName, photoDirPath } = require("../config/config");
const { removeFile } = require("../libs/fileSystem");
const validation = require("../libs/validation");
const { storePhoto } = require('../libs/photoHandler');
const { setSession } = require('../libs');
const User = require("../db/user").User;

const updateUser = async (req, res) => {
  const sessionUser = req.session?.user;
  if (!sessionUser) return res.sendStatus(500);

  const photoFileName = req.file?.filename || '';
  const tmpPhotoSrc = photoFileName ? path.join(tmpDirPath, photoFileName) : '';

  const updateData = req.body;
  updateData.name = updateData.name.trim();

  const checks = checkRegData(updateData);
  if (!checks.status) {
    removeFile(tmpPhotoSrc);
    return res.send(checks);
  }

  // save photo, if photo provided
  let handledPhotoFileName = '';
  let handledPhotoSrc;
  let isPhotoStored = false;
  if (photoFileName) {
    handledPhotoFileName = path.parse(photoFileName).name + '.webp';
    handledPhotoSrc = path.join(photoDirPath, handledPhotoFileName);
    try {
      isPhotoStored = await storePhoto(tmpPhotoSrc, handledPhotoSrc);
    } catch (error) {
      console.error(error);
    }
  }

  if (isPhotoStored) {
    const oldPhotoSrc = path.join(photoDirPath, sessionUser.photoFileName);
    removeFile(oldPhotoSrc);
  }

  const updateQuery = createUpdateQuery({
    name: updateData.name,
    hashedPassword: updateData.password ? User.encryptPassword(updateData.password, sessionUser.salt) : '',
    photoFileName: isPhotoStored ? handledPhotoFileName : '',
  })

  let user;
  try {
    user = await User.findOneAndUpdate(
      {email: sessionUser.email},
      updateQuery,
      {new: true}
    );
  } catch (error) {
    return next(error);
  }

  req.session.user = setSession(user);

  res.send({
    status: true,
    message: 'User edited'
  });
};

function checkRegData({ name, password, repeatedPassword }) {
  const warnings = {
    name: name ? validation.checkName(name) : '',
    password: password ? validation.checkPassword(password) : '',
    repeatedPassword: password ? validation.checkRepeatedPassword(password, repeatedPassword) : '',
  };

  const status = !Object.values(warnings).find(v => v);

  return {status, warnings};
};

function getPhotoFileName(oldName, newName) {
  if (oldName === noPhotoFileName) {
    return path.parse(newName).name + '.webp';
  } else {
    return oldName;
  }
};

function createUpdateQuery(fields = {}) {
  const query = {};
  for (const key in fields) {
    if (Object.hasOwnProperty.call(fields, key)) {
      if (!fields[key]) continue;
      query[key] = fields[key];
    }
  }
  return query;
}

module.exports = updateUser;
