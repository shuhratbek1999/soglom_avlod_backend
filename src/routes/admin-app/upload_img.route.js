const express = require('express');
const {port} = require('../../startup/config');
const router = express.Router();
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'upload');
    },
    filename: (req, file, cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        }
})


var upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }
}).single('href');

router.post('/img', upload, awaitHandlerFactory(async (req, res, next) => {   
    res.send("salom") 
    console.log(req.body);
}));
router.post("/imgs", upload, function(request, response) {
    response.json({
        img: `http://localhost:${port}/href/${request.file.filename}`
    })
    });

module.exports = router;