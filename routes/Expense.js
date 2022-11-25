const express=require('express');
const authenticateMiddleware=require('../middleware/auth');
const expenceController=require('../controller/expense');
 const router=express.Router();

 router.post('/add-expense',authenticateMiddleware.authenticate,expenceController.postExpense);
 router.get('/get-expense?:page',authenticateMiddleware.authenticate,expenceController.getExpense);
 router.delete('/delete/:id',expenceController.deleteExpense);
 router.get('/get-all-expense',authenticateMiddleware.authenticate,expenceController.getAllExpense);
 router.get('/download',authenticateMiddleware.authenticate,expenceController.downloadexpense);
 router.get('/getexpense',expenceController.getexpense);
//  router.post('/getObj',expenceController.getobj);
// router.post('/edit/:id',expenceController.editExpence);
 module.exports=router;