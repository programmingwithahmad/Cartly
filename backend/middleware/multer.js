import multer from "multer";

// keep image in memory before uploading to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
