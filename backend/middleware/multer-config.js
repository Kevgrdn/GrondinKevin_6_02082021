const multer = require('multer');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


//Enregistre le fichier dans le dossier "images"
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        //Si le nom comporte des espaces, les remplace par des "_"
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
     callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');