// middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "/tmp/uploads"; // ✅ writable directory

// Ensure directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // ✅ use /tmp instead of uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });


