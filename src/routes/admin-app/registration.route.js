const express = require('express');
const router = express.Router();
// const registrationControl = require('../../controllers/admin-app/registration.controller');
const registrationControl = require('../../controllers/admin-app/registration.controller1');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {registrationValidate}  = require('../../middleware/validators/admin-app/RegistrationValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(registrationControl.getAll));
router.get('/register_kassa', auth(), awaitHandlerFactory(registrationControl.registerAll));
router.get('/queue', auth(), awaitHandlerFactory(registrationControl.queueAll));
router.get('/kassaAll', auth(), awaitHandlerFactory(registrationControl.kassaAll));
router.get('/directAll', auth(), awaitHandlerFactory(registrationControl.directAll));
router.post('/direct', auth(), awaitHandlerFactory(registrationControl.direct));
router.get('/one/:id', auth(), awaitHandlerFactory(registrationControl.getOne));
router.get('/one_arxiv/:id', auth(), awaitHandlerFactory(registrationControl.getOneArxiv));
router.get('/all_arxiv', auth(), awaitHandlerFactory(registrationControl.getAll_arxiv));
router.get('/directOne/:id', auth(), awaitHandlerFactory(registrationControl.directOne));
router.get('/palata/:id', auth(), awaitHandlerFactory(registrationControl.palataDel));
router.post('/create', auth(), registrationValidate, awaitHandlerFactory(registrationControl.create));
router.get('/pechat/:patient', auth(),  awaitHandlerFactory(registrationControl.getPechat));
router.post('/inspection', auth(),  awaitHandlerFactory(registrationControl.inspection));
router.post('/imtiyoz', auth(),  awaitHandlerFactory(registrationControl.Imtiyozli));
router.post('/search', auth(),  awaitHandlerFactory(registrationControl.search));
router.post('/searchs', auth(),  awaitHandlerFactory(registrationControl.searchs));
router.post('/insSverka', auth(),  awaitHandlerFactory(registrationControl.insSverka));
router.post('/palata', auth(),  awaitHandlerFactory(registrationControl.palata));
router.post('/kassa', auth(),  awaitHandlerFactory(registrationControl.kassa));
router.post('/kassasverka', auth(),  awaitHandlerFactory(registrationControl.kassaSverka));
router.post('/directhisobot', auth(),  awaitHandlerFactory(registrationControl.directHisobot));
router.post('/directSverka', auth(),  awaitHandlerFactory(registrationControl.directSverka));
router.patch('/update/:id', auth(), registrationValidate, awaitHandlerFactory(registrationControl.update));
router.patch('/directUpdate/:id', auth(), awaitHandlerFactory(registrationControl.directUpdate));
router.delete('/delete/:id', auth(), awaitHandlerFactory(registrationControl.deleted));
router.delete('/direct/:id', auth(), awaitHandlerFactory(registrationControl.directDelete));
module.exports = router;