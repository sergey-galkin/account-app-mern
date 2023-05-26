const sharp = require('sharp');
const { removeFile } = require('./fileSystem');

exports.storePhoto = (src, dist) => {
  return new Promise(async function (resolve, reject) {
    
    const photo = sharp(src);
    
    await photo
      .toFile(dist)
      .then(info => {
        resolve(true);
      })
      .catch(err => {
        if (err) {
          console.log('storePhoto');
          console.log(err);
          reject(false)
        }
      })
    ;

    removeFile(src);
  })
}
  