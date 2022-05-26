const { body } = require('express-validator');

exports.InspectionsVAlidator = [
body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 4, max: 30})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
body('parent_id')
        .exists()
        .isInt()
        .withMessage('Int typeda kiriting'),
body('price')
        .exists()
        .isDecimal()
        .withMessage('decimal typeda kiriting'),
body('type')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 4, max: 30})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
body('user_id')
        .exists()
        .isInt()
        .withMessage('Int typeda kiriting'),
body('category_id')
        .exists()
        .isInt()
        .withMessage('Int typeda kiriting'),
body('percent_bonus')
        .exists()
        .isDecimal()
        .withMessage('decimal typeda kiriting'),
body('inspectionChild')
        .exists()
        .withMessage('InspectionChildni to\'ldiring')
        .isArray()
        .withMessage('massiv ko\'rinishida')
        .custom(value => {
                return value.every((element) => {
                        let ok = true;
                        ok = ok && element.norm != null;
                        ok = ok && element.parent_id != null;
                        ok = ok && element.price != null;
                        ok = ok && element.name != null;
                        ok = ok && element.file != null;
                        return ok;
                })
        })
];