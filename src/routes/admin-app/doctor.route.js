const express = require('express');
const router = express.Router();
const doctorController = require('../../controllers/admin-app/doctor.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {doctorValidate}  = require('../../middleware/validators/admin-app/doctorValidator.middleware');

router.get('/all', auth(Role.Admin, Role.Dasturchi, Role.Shifokor), awaitHandlerFactory(doctorController.getAll));
router.get('/byName', auth(Role.Admin, Role.Dasturchi, Role.Shifokor), awaitHandlerFactory(doctorController.byName));
router.get('/one/:id', awaitHandlerFactory(doctorController.getOne));
router.post('/create',auth(Role.Admin, Role.Dasturchi, Role.Shifokor), doctorValidate, awaitHandlerFactory(doctorController.create));
router.patch('/update/:id', doctorValidate, auth(Role.Admin, Role.Dasturchi, Role.Shifokor), awaitHandlerFactory(doctorController.update));
router.delete('/delete/:id', auth(Role.Admin, Role.Dasturchi, Role.Shifokor), awaitHandlerFactory(doctorController.delete));
module.exports = router;