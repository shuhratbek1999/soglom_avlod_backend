const express = require('express');
const router = express.Router();
const registrationControl = require('../../controllers/admin-app/registration_arxiv.controller');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {registrationValidate}  = require('../../middleware/validators/admin-app/RegistrationValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(registrationControl.getAll));
router.get('/queue', auth(), awaitHandlerFactory(registrationControl.queueAll));
router.get('/one/:id', auth(), awaitHandlerFactory(registrationControl.getOne));
router.get('/palata/:id', auth(), awaitHandlerFactory(registrationControl.palataDel));
router.post('/create', auth(), registrationValidate, awaitHandlerFactory(registrationControl.create));
router.get('/pechat/:patient', auth(),  awaitHandlerFactory(registrationControl.getPechat));
router.patch('/update/:id', auth(), registrationValidate, awaitHandlerFactory(registrationControl.update));
module.exports = router;