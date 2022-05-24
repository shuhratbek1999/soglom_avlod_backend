const express = require('express');
const router = express.Router();
const QueueController = require('../../controllers/admin-app/queue.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const  {doctorValidate}  = require('../../middleware/validators/admin-app/doctorValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(QueueController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(QueueController.getOne));
router.post('/create',auth(), awaitHandlerFactory(QueueController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(QueueController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(QueueController.delete));
module.exports = router;