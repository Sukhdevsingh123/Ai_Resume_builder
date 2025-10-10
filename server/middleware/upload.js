const multer = require('multer');

// Configure multer to store files in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
});

// Middleware for handling multiple resume uploads
const uploadResumes = upload.fields([
  { name: 'freelanceFile', maxCount: 1 },
  { name: 'techstackFile', maxCount: 1 }
]);

module.exports = uploadResumes;