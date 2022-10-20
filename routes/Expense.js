const express=require('express');
const path=require('path');
const expenceController=require('../controller/expense');
 const router=express.Router();

 router.post('/add-expense',expenceController.postExpense);
 router.get('/get-expense',expenceController.getExpense);
 router.delete('/delete/:id',expenceController.deleteExpense);
router.post('/edit/:id',expenceController.editExpence);
 module.exports=router;