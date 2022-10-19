const { body } = require('express-validator');

exports.registrationValidate = [
   body('user_id')
        .exists()
        .withMessage('int typeda kiriting'),
       body('complaint')
       .exists()
       .withMessage('Int tipida kiriting'),
       body('summa')
       .exists()
       .withMessage('decimal tipida kiriting'),
       body('pay_summa')
       .exists()
       .withMessage('decimal tipida kiriting'),
       body('backlog')
       .exists()
       .withMessage('decimal tipida kiriting'),
       body('discount')
       .exists()
       .withMessage('decimal tipida kiriting'),
       body('patient_id')
       .exists()
       .withMessage('Bemor tanlanilishi kerak'),
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