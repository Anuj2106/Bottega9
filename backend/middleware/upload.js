const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Base upload folder
const baseUploadPath = path.join(__dirname, '..', 'public', 'uploads');

// Helper to ensure directory exists
const ensureFolder = (folderName) => {
  const fullPath = path.join(baseUploadPath, folderName);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  return fullPath;
};

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fieldName = file.fieldname;

    if (fieldName === 'prod_img') {
      cb(null, ensureFolder('product_images'));
    } else if (fieldName === 'image') {
      cb(null, ensureFolder('testimonial_images'));
    } else if (fieldName === 'video') {
      cb(null, ensureFolder('testimonial_videos'));
    } else {
      cb(new Error('Unsupported file field'), false);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  }
});


// File filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|webp/;
  const allowedVideoTypes = /mp4|webm|ogg/;

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  const isImage = allowedImageTypes.test(ext) && mime.startsWith('image/');
  const isVideo = allowedVideoTypes.test(ext) && mime.startsWith('video/');

  if (isImage || isVideo) {
    cb(null, true);
  } else {
    cb(new Error('Only images (jpeg, jpg, png, webp) and videos (mp4, webm, ogg) are allowed!'));
  }
};

// Export multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
