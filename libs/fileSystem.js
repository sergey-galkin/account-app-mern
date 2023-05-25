const fs = require('fs')
const { tmpDirPath, photoDirPath } = require('./config');

function createDirIfNeed(path) {
  try {
    fs.accessSync(path);
  } catch (error) {
    try {
      fs.mkdirSync(path, {recursive: true})
    } catch (error) {
      console.error(error);
    }
  }
};

function removeFile(src) {
  if (!src) return;
  
  fs.unlink(src, (err) => {
    if (err) console.error(err);
  });
}


exports.removeFile = removeFile;
exports.createDirectories = () => {
  createDirIfNeed(tmpDirPath);
  createDirIfNeed(photoDirPath);
}