const express = require('express');
const router = express.Router();
const bassen_summaController = require('../../controllers/admin-app/bassen_summa.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/all', auth(),  awaitHandlerFactory(bassen_summaController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(bassen_summaController.getOne));
// router.post('/create',auth(), awaitHandlerFactory(bassen_summaController.create));
router.post('/kirish',auth(), awaitHandlerFactory(bassen_summaController.kirish));
router.patch('/update/:id', auth(), awaitHandlerFactory(bassen_summaController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(bassen_summaController.delete));
module.exports = router;