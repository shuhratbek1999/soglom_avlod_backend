const express = require('express');
const router = express.Router();
const registrationControl = require('../../controllers/admin-app/registration.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const  {registrationValidate}  = require('../../middleware/validators/admin-app/RegistrationValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(registrationControl.getAll));
router.get('/register_kassa', auth(), awaitHandlerFactory(registrationControl.registerAll));
router.get('/queue', auth(), awaitHandlerFactory(registrationControl.queueAll));
router.get('/kassaAll', auth(), awaitHandlerFactory(registrationControl.kassaAll));
router.get('/directAll', auth(), awaitHandlerFactory(registrationControl.directAll));
router.post('/direct', auth(), awaitHandlerFactory(registrationControl.direct));
router.get('/one/:id', auth(), awaitHandlerFactory(registrationControl.getOne));
router.post('/create', auth(),  awaitHandlerFactory(registrationControl.create));
router.post('/inspection', auth(),  awaitHandlerFactory(registrationControl.inspection));
router.post('/insSverka', auth(),  awaitHandlerFactory(registrationControl.insSverka));
router.post('/palata', auth(),  awaitHandlerFactory(registrationControl.palata));
router.post('/kassa', auth(),  awaitHandlerFactory(registrationControl.kassa));
router.post('/kassasverka', auth(),  awaitHandlerFactory(registrationControl.kassaSverka));
router.post('/directhisobot', auth(),  awaitHandlerFactory(registrationControl.directHisobot));
router.patch('/update/:id', auth(), awaitHandlerFactory(registrationControl.update));
router.patch('/directUpdate/:id', auth(), awaitHandlerFactory(registrationControl.directUpdate));
router.delete('/delete/:id', auth(), awaitHandlerFactory(registrationControl.delete));
router.delete('/direct/:id', auth(), awaitHandlerFactory(registrationControl.directDelete));
module.exports = router;