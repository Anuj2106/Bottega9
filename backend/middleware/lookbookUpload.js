const multer = require("multer");
const path = require("path");

// Set storage for lookbook files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/lookbooks");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Accept only PDF files
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".pdf" && file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5MB limit
});

module.exports = upload.single("lookbook_pdf"); // field name in form
