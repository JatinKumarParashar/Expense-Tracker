const express=require('express');
const path=require('path');
const authenticateMiddleware=require('../middleware/auth');
const expenceController=require('../controller/expense');
 const router=express.Router();

 router.post('/add-expense',authenticateMiddleware.authenticate,expenceController.postExpense);
 router.get('/get-expense',authenticateMiddleware.authenticate,expenceController.getExpense);
 router.delete('/delete/:id',expenceController.deleteExpense);
//router.post('/edit/:id',expenceController.editExpence);
 module.exports=router;