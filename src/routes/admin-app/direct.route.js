const express = require('express');
const router = express.Router();
const DirectController = require('../../controllers/admin-app/direct.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/all', auth(),  awaitHandlerFactory(DirectController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(DirectController.getOne));
router.post('/create',auth(), awaitHandlerFactory(DirectController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(DirectController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(DirectController.delete));
module.exports = router;