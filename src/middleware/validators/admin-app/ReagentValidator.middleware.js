const { body } = require('express-validator');

exports.reagent = [
   body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 3, max: 300})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
    body('price')
         .exists()
         .isDecimal()
         .withMessage('Decimal tipida kiriting'),
         body('count')
         .exists()
         .isDecimal()
         .withMessage('Decimal tipida kiriting')
];