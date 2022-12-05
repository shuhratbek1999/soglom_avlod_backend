const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin-app/user.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {validateLogin}  = require('../../middleware/validators/admin-app/userValidator.middleware');
const  {loginValidate}  = require('../../middleware/validators/admin-app/loginValidator.middleware');
router.post('/login', loginValidate, awaitHandlerFactory(userController.userLogin));
router.get('/all', awaitHandlerFactory(userController.getAll));
router.get('/byName', awaitHandlerFactory(userController.byName));
router.get('/one/:id',   auth(Role.Admin, Role.Dasturchi), awaitHandlerFactory(userController.getOne));
router.post('/create', validateLogin, awaitHandlerFactory(userController.create));
router.patch('/update/:id', validateLogin, auth(Role.Admin, Role.Dasturchi), awaitHandlerFactory(userController.update));
router.delete('/delete/:id', auth(Role.Admin, Role.Dasturchi), awaitHandlerFactory(userController.delete));
module.exports = router;