const { body } = require('express-validator');

exports.InspectionsVAlidator = [
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