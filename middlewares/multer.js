const multer = require('multer')
const path = require('path')

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public'))
    },
    filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})

let upload = multer({ storage: diskStorage }).single('picture')

module.exports = upload