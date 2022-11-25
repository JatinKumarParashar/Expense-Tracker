const express=require('express');
const authenticateMiddleware=require('../middleware/auth');
const premiumController=require('../controller/premium');
const router=express.Router();

router.get('/premium',authenticateMiddleware.authenticate,premiumController.getUser);

module.exports=router;