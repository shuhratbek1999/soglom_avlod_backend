const express = require('express');
const router = express.Router();
const registrationControl = require('../../controllers/admin-app/registration.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {registrationValidate}  = require('../../middleware/validators/admin-app/RegistrationValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(registrationControl.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(registrationControl.getOne));
router.post('/create', auth(), registrationValidate, awaitHandlerFactory(registrationControl.create));
router.patch('/update/:id', auth(), registrationValidate, awaitHandlerFactory(registrationControl.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(registrationControl.delete));
module.exports = router;