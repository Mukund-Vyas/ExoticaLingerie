const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to ensure only certain file types are allowed
const fileFilter = (req, file, cb) => {
  // Accept only csv files
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only CSV is allowed!'), false);
  }
};

// Initialize upload middleware with multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },  // 10 MB file size limit
  fileFilter: fileFilter
});

module.exports = upload;
