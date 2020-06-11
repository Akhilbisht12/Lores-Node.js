multer = require("multer");


// Multer Configuration
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

var imageFilter = function(req, file, cb) {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept file
        cb(null, true);
    } else {
        // reject file
        cb(null, false);
    }



}

var upload = multer({
    fileFilter: imageFilter,
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }
});

module.exports = upload;