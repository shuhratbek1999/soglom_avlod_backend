const express = require('express');
const router = express.Router();
const RegisterPatientController = require('../../controllers/admin-app/registerPatientController');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const { registerPatientValidate } = require('../../middleware/validators/admin-app/registerPatientValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(RegisterPatientController.getAll));
router.get('/patient-all', auth(), awaitHandlerFactory(RegisterPatientController.getAllPatient));
router.get('/one/:id', auth(), awaitHandlerFactory(RegisterPatientController.getOne));
router.post('/search', auth(), awaitHandlerFactory(RegisterPatientController.search));
router.post('/balance', auth(), awaitHandlerFactory(RegisterPatientController.getPatientBalance));
router.post('/create', auth(), registerPatientValidate, awaitHandlerFactory(RegisterPatientController.create));
router.patch('/update/:id', auth(), registerPatientValidate, awaitHandlerFactory(RegisterPatientController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(RegisterPatientController.delete));
module.exports = router;