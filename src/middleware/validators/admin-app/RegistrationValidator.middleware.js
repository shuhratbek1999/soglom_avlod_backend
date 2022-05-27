const { body } = require('express-validator');

exports.registrationValidate = [
   body('user_id')
        .exists()
        .isInt()
        .withMessage('int typeda kiriting'),
    body('created_at')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
      body('updated_at')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
     body('status')
         .exists()
         .isString()
         .withMessage('String tipida kiriting'),
      body('patient_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
         body('type_service')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
         body('complaint')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
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
     body('registration_doctor')
         .exists()
         .isArray()
         .withMessage('massiv korinishida yozing'),
     body('doctor_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
     body('registration_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'), 
     body('status')
         .exists()
         .isString()
         .withMessage('String tipida kiriting'),
     body('price')
         .exists()
         .isDecimal()
         .withMessage('decimal tipida kiriting'),
     body('text')
         .exists()
         .isString()
         .withMessage('String tipida kiriting'),
     body('registration_files')
         .exists()
         .isArray()
         .withMessage('massiv korinishida yozing'),
     body('registration_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'), 
     body('href')
         .exists()
         .isString()
         .withMessage('String tipida kiriting'),
     body('registration_inspection')
         .exists()
         .isArray()
         .withMessage('masiv korinishida kiriting'),
     body('registration_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
     body('inspection_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
     body('type')
         .exists()
         .isString()
         .withMessage('String tipida kiriting'),
     body('price')
         .exists()
         .isDecimal()
         .withMessage('decimal tipida kiriting'),
     body('category_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
     body('status')
         .exists()
         .isString()
         .withMessage('String tipida kiriting'),
     body('registration_pay')
         .exists()
         .isArray()
         .withMessage('massiv korinishida yozing'),
     body('user_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'),
     body('registration_id')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'), 
     body('pay_type')
         .exists()
         .isString()
         .withMessage('String tipida kiriting'),
     body('summa')
         .exists()
         .isDecimal()
         .withMessage('decimal tipida kiriting'),
         body('date_time')
         .exists()
         .isInt()
         .withMessage('int tipida kiriting'), 
];