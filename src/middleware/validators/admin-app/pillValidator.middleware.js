const { body } = require('express-validator');

exports.pillValidate = [
   body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 3, max: 30})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
];