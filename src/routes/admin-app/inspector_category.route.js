const express = require('express');
const router = express.Router();
const inspector_categoryController = require('../../controllers/admin-app/inspector_category.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {inspection_id}  = require('../../middleware/validators/admin-app/inspectionValidator.middleware');

router.get('/all',auth(Role.Admin, Role.Dasturchi, Role.Loborant), awaitHandlerFactory(inspector_categoryController.getAll));
router.get('/one/:id', auth(Role.Admin, Role.Dasturchi, Role.Loborant), awaitHandlerFactory(inspector_categoryController.getOne));
router.post('/create', auth(Role.Admin, Role.Dasturchi, Role.Loborant), inspection_id, awaitHandlerFactory(inspector_categoryController.create));
router.patch('/update/:id', auth(Role.Admin, Role.Dasturchi, Role.Loborant), inspection_id, awaitHandlerFactory(inspector_categoryController.update));
router.delete('/delete/:id', auth(Role.Admin, Role.Dasturchi, Role.Loborant), awaitHandlerFactory(inspector_categoryController.delete));
module.exports = router;