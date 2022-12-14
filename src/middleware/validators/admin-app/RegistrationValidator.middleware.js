const { body } = require('express-validator');

exports.registrationValidate = [
       body('summa')
       .exists()
       .isDecimal()
       .withMessage("decimal"),
       body('patient_id')
       .exists()
       .withMessage('bemor kiritilishi shart')
       .isInt()
       .withMessage('Bemor tanlanilishi kerak'),
       body('registration_doctor')
       .exists()
       .isArray()
       .withMessage('massiv doctor')
       .custom(value => {
         return value.every(element =>{
            let ok = true;
            ok = ok && element.doctor_id != null
            return ok;
         })
       })
     
];