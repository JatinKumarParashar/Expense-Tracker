const { json } = require('body-parser');
const { where } = require('sequelize');
const Expence = require('../models/expense');
const expence = require('../models/expense');

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


exports.getExpense=(req,res,next)=>{

    console.log('req.user',req.user);
 Expence.findAll({where:{userId:req.user.dataValues.id}}).then(result=>{
    res.status(201).json(result);
 }).catch(err=>{
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
