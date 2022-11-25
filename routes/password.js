const express=require('express');

 const router=express.Router();

 const resetpasswordController=require('../controller/password');



 router.get('/updatepassword/:resetpasswordid', resetpasswordController.updatepassword)
 
 router.get('/resetpassword/:id', resetpasswordController.resetpassword)
 
 router.post('/forgotpassword', resetpasswordController.forgotpassword)
 
 module.exports = router;