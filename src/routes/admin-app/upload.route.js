const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/');  
    },
    filename: function(req, file, cb){
        console.log(req.body);
        req.body.href = new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname);
        cb(null, req.body.href);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'application/pdf' || file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        cb(null, true);
    }else{
        cb(null, false);
        return cb(new Error('Only images are allowed'))
    } 
}

var upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('href');

router.post('/file', upload, awaitHandlerFactory(async (req, res, next) => {    
    res.status(201).send(req.body.href);
}));


module.exports = router;