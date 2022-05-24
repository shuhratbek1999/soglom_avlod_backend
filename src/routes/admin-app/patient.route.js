const express = require('express');
const router = express.Router();
const PatientController = require('../../controllers/admin-app/patientController');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {doctorValidate}  = require('../../middleware/validators/admin-app/doctorValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(PatientController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(PatientController.getOne));
router.post('/create',auth(), awaitHandlerFactory(PatientController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(PatientController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(PatientController.delete));
module.exports = router;