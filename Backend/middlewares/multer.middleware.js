import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use /tmp for Vercel serverless functions (only writable directory)
        // Falls back to local uploads for development
        const uploadPath = process.env.VERCEL ? '/tmp' : path.join(__dirname, '../uploads/');
        console.log("Multer saving file to:", uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        console.log("Multer filename:", filename);
        cb(null, filename);
    }
});

export const upload = multer({
     storage: storage,
     limits: {
         fileSize: 5 * 1024 * 1024 // 5MB limit
     },
     fileFilter: function (req, file, cb) {
         console.log("Multer file filter:", file);
         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
         if (allowedTypes.includes(file.mimetype)) {
             cb(null, true);
         } else {
             cb(new Error('Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.'));
         }
     }
});

