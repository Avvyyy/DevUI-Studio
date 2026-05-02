import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory for processing

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allow common code file extensions
    const allowedExtensions = [
        '.js', '.ts', '.jsx', '.tsx', '.vue', '.py', '.java', '.go', '.rs',
        '.php', '.rb', '.swift', '.kt', '.cs', '.cpp', '.c', '.h', '.hpp',
        '.json', '.yaml', '.yml', '.xml', '.html', '.css', '.scss', '.sass',
        '.md', '.txt', '.env', '.gitignore', '.sql'
    ];

    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error(`File type ${ext} is not supported`));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB per file
        files: 10, // Maximum 10 files
    },
});


