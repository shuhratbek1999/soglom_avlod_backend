const express = require('express');
const router = express.Router();
const inspectionController = require('../../controllers/admin-app/inspection.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const  {roomValidate}  = require('../../middleware/validators/admin-app/roomValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(inspectionController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(inspectionController.getOne));
router.post('/create', auth(), awaitHandlerFactory(inspectionController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(inspectionController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(inspectionController.delete));
module.exports = router;