const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err instanceof multer.MulterError) {
    res.send({
      status: false,
      warnings: {
        photo: err.message
      }
    })
  } else if (err.message === 'Bad photo MIME type') {
    res.send({
      status: false,
      warnings: {
        photo: 'Allowed file extentions: jpg, jpeg, png, webp'
      }
    })
  } else {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = errorHandler;