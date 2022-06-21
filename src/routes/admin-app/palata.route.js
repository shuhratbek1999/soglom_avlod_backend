const express = require('express');
const router = express.Router();
const palataController = require('../../controllers/admin-app/palata.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const  {doctorValidate}  = require('../../middleware/validators/admin-app/doctorValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(palataController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(palataController.getOne));
router.post('/create',auth(), awaitHandlerFactory(palataController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(palataController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(palataController.delete));
module.exports = router;