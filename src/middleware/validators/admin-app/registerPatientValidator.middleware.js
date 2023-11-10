const { body } = require('express-validator');

exports.registerPatientValidate = [
    body('patient_id')
        .exists()
        .isInt(),
    body('doc_id')
        .exists()
        .isInt(),
     body('summa')
         .exists()
         .isDecimal(),
     body('registration_id')
         .exists()
         .isInt(),
    body('datetime')
        .exists()
        .isInt(),
    body('type')
        .exists()
        .isInt(),
    body('place')
        .exists()
        .isString(),
    body('doc_type')
        .exists()
        .isString(),
    
];