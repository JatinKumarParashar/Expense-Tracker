const { json } = require('body-parser');
const { where, useInflection } = require('sequelize');
const Expence = require('../models/expense');
const expence = require('../models/expense');
const User=require('../models/user');


exports.postExpense=async (req,res,next)=>{
   const ammount=req.body.amm;
   const description=req.body.des;
   const category=req.body.cat;
   const userId=req.user.dataValues.id;
   console.log('123',ammount,description,category);
  const data= await expence.create({
        ammount:ammount,
        description:description,
        category:category,
        userId:userId
      })

      res.status(201).json(data);
}
var numberOfUser;
exports.getAllExpense=(req,res,next)=>{
  
  Expence.findAll().then(result=>{
    console.log('number of users',result.length);
    numberOfUser=result.length
    console.log('123',result)
    let response={

    };
    result.forEach((expense)=>{
      if(response[expence.userId]){
        response[expense.id].push(expense); 
      }
      else{
        response[expense.userId]=[];
        response[expense.userId].push(expense)

      }

    })
    console.log('all expense of every user',response);
    res.status(201).json(response);
  })



  
  // Expence.findAll()
  // .then(result=>{
  //  // console.log('result in getAllExpense >>>>>>>',result)
  //   res.status(200).json({
  //     result:{
  //       result,
  //       user:req.user
  //     }
  //   });
  // })
  // .catch(err=>{
  //   console.log(err);
  // })



}

exports.getExpense=(req,res,next)=>{
  const page=+req.query.page;
  console.log('checking page',page);
  let totalItems;
   // console.log('req.user controller',req.user);
 Expence.count({where:{userId:req.user.dataValues.id}}).then(result=>{
 totalItems=result;
 return Expence.findAll({
  where:{userId:req.user.dataValues.id},
  offset:(page-1)*2,
        limit:2
 })
 // console.log('req.user again',req.user.dataValues.ispremiumuser);
  
 }).then(expense=>{
   if(req.user.dataValues.ispremiumuser){
   
     res.status(201).json({
      expense:expense,
      totalProducts: totalItems,
      currentPage:page,
      hasNextPage: 2 * page < totalItems,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / 2)
     });
   }
   else{
     res.status(200).json({
      expense:expense,
      totalProducts: totalItems,
      currentPage:page,
      hasNextPage: 2 * page < totalItems,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / 2)
     });
   }

 })
 .catch(err=>{
    console.log(err);
 })
}


  exports.deleteExpense=(req,res,next)=>{
    const id=req.params.id;
    expence.findByPk(id).then((user) => {
        return user.destroy(user);
    
      })
      .then(result => {
        console.log('user has been deleted');
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  

    exports.editExpence=(req,res,next)=>{
        const id=req.params.id;
    }
