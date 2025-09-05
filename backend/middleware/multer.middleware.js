import multer from "multer";

// Use memory storage since we’ll upload directly to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
