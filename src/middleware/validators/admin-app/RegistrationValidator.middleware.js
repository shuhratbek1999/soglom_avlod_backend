const { body } = require('express-validator');

exports.registrationValidate = [
   body('user_id')
        .exists()
        .isInt()
        .withMessage('int typeda kiriting'),
    body('created_at')
         .optional()
         .isInt()
         .withMessage('int tipida kiriting'),
      body('updated_at')
         .optional()
         .isInt()
         .withMessage('int tipida kiriting'),
       body('status')
       .exists()
       .isString()
       .withMessage('string tipida kiriting'),
       body('patient_id')
       .exists()
       .isInt()
       .withMessage('Int tipida kiriting'),
       body('type_service')
       .exists()
       .isInt()
       .withMessage('Int tipida kiriting'),
       body('complaint')
       .exists()
       .isInt()
       .withMessage('Int tipida kiriting'),
       body('summa')
       .exists()
       .isDecimal()
       .withMessage('decimal tipida kiriting'),
       body('pay_summa')
       .exists()
       .isDecimal()
       .withMessage('decimal tipida kiriting'),
       body('backlog')
       .exists()
       .isDecimal()
       .withMessage('decimal tipida kiriting'),
       body('discount')
       .exists()
       .isDecimal()
       .withMessage('decimal tipida kiriting'),
];