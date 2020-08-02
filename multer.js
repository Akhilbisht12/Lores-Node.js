multer = require("multer");
const path = require('path');


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
    var ext = path.extname(file.originalname);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||  ext === '.zip') {
        // accept file
        console.log('multer accept')

        cb(null, true);
    } else {
        // reject filecon
        console.log('multer declined')
        cb(null, false);
    }



}

var upload = multer({
    fileFilter: imageFilter,
    storage: storage,
    //limits: { fileSize: 1024 * 1024 * 5 }
});

module.exports = upload;