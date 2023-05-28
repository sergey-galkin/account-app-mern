const path = require('path');

module.exports = {
  tmpDirPath: path.join(process.cwd(), 'tmp'),
  photoDirPath: path.join(process.cwd(), 'public/images/accounts'),
  noPhotoFileName: 'no-photo.webp',
  maxPhotoSize: 1024 * 1024,
}