const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const multer = require('multer');
const path = require('path');
// const uploadController = require('../controllers/upload.controller');
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
// const excelfilter = (req, file, cb) => {
//     if(file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
//     || file.mimetype == 'application/vnd.ms-excel'){
//         cb(null, true);
//     }else{
//         // throw new HttpException('Only excel files are allowed');
//         cb(new Error('excel_file'));
//         // cb(null, false);
//     }
// }

var upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('href');
// var uploadexcel = multer({
//     storage: storage,
//     limits:{
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: excelfilter
// }).single('href');

router.post('/file', upload, awaitHandlerFactory(async (req, res, next) => {    
    res.status(201).send(req.body.href);
}));
// router.post('/inspection', uploadexcel, awaitHandlerFactory(uploadController.inspection));

module.exports = router;