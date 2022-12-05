const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/admin-app/room.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {roomValidate}  = require('../../middleware/validators/admin-app/roomValidator.middleware');

router.get('/all', auth(Role.Admin, Role.Dasturchi), awaitHandlerFactory(roomController.getAll));
router.get('/one/:id', auth(Role.Admin, Role.Dasturchi), awaitHandlerFactory(roomController.getOne));
router.post('/create', roomValidate, auth(Role.Admin, Role.Dasturchi), awaitHandlerFactory(roomController.create));
router.patch('/update/:id', roomValidate, auth(Role.Admin, Role.Dasturchi), awaitHandlerFactory(roomController.update));
router.delete('/delete/:id', auth(Role.Admin, Role.Dasturchi), awaitHandlerFactory(roomController.delete));
module.exports = router;