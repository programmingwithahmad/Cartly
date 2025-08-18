// middleware/upload.js
import multer from "multer";

// Use memory storage (no disk, required for Vercel)
export const upload = multer({ storage: multer.memoryStorage() });
