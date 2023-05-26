const multer = require('multer');
const path = require('path');
const { tmpDirPath } = require('../config/config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpDirPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  },
});

function fileFilter (req, file, cb) {
  const exts = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (exts.indexOf(file.mimetype) > -1) {
    cb(null, true)
  } else {
    cb(new Error('Bad photo MIME type'))
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024,
  }
});

exports.handleMultipartFormData = upload.single('photo');