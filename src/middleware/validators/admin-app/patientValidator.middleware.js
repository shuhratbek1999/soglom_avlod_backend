const { body } = require('express-validator');

exports.patientValidate = [
   body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 4, max: 30})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
    body('fullname')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('lastname')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('patronymic')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
     body('region_id')
         .optional()
         .isInt()
         .withMessage('Int tipida kiriting'),
     body('district_id')
         .optional()
         .isInt()
         .withMessage('Int tipida kiriting'),
     body('gender')
         .exists()
         .isString()
         .withMessage('string tipida kiriting'),
];