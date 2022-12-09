const express = require('express');
const router = express.Router();
const inspectionController = require('../../controllers/admin-app/inspection.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {InspectionsVAlidator}  = require('../../middleware/validators/admin-app/InspectionsValidator.middleware');

router.get('/all', auth(Role.Admin, Role.Dasturchi, Role.Loborant, Role.Shifokor), awaitHandlerFactory(inspectionController.getAll));
router.get('/one/:id', auth(Role.Admin, Role.Dasturchi, Role.Loborant, Role.Shifokor), awaitHandlerFactory(inspectionController.getOne));
router.post('/create', auth(Role.Admin, Role.Dasturchi, Role.Loborant, Role.Shifokor),InspectionsVAlidator, awaitHandlerFactory(inspectionController.create));
router.patch('/update/:id', auth(Role.Admin, Role.Dasturchi, Role.Loborant, Role.Shifokor), InspectionsVAlidator, awaitHandlerFactory(inspectionController.update));
router.delete('/delete/:id', auth(Role.Admin, Role.Dasturchi, Role.Loborant, Role.Shifokor), awaitHandlerFactory(inspectionController.delete));
module.exports = router;