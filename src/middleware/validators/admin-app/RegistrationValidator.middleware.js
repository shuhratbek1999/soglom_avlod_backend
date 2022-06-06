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
      //  body('registration_doctor')
      //  .exists()
      //  .isArray()
      //  .withMessage('massiv korinishida kiriting'),
      //  body('doctor_id')
      //  .exists()
      //  .isInt()
      //  .withMessage('Int tipida kiriting'),
      //  body('status')
      //  .exists()
      //  .isString()
      //  .withMessage('String tipida kiriting'),
      //  body('price')
      //  .exists()
      //  .isDecimal()
      //  .withMessage('decimal tipida kiriting'),
      //  body('text')
      //  .exists()
      //  .isString()
      //  .withMessage('string korinishida kiriting')
];