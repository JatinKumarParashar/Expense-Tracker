const express = require('express');
const router = express.Router();
const signUpController=require('../controller/signUp');

router.post('/signup',signUpController.getSignUp);

module.exports=router;