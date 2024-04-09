const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the absolute path to the destination directory
        const uploadDir = path.join(__dirname, '../../src/uploads/BackImage');
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});


const backUpload = multer({ storage: storage });

module.exports = backUpload;
