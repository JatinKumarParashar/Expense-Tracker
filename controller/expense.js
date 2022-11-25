const { json } = require('body-parser');
const Expense = require('../models/expense');
const User = require('../models/user');
const AWS = require('aws-sdk');


exports.postExpense = async (req, res, next) => {
  const ammount = req.body.amm;
  const description = req.body.des;
  const category = req.body.cat;
  const id = req.body.id;
  const userId = req.user._id;
  console.log('123', ammount, description, category);
  const data = new Expense(
    ammount,
    description,
    category,
    id,
    userId
  );
  data.save().then(data => {
    res.status(201).json(data);
  })
}
var numberOfUser;


exports.getAllExpense = (req, res, next) => {
  //console.log('req.user.dataValues.id >>>>>>',req.user.dataValues.id);
  User.findAll().then(result => {
    console.log('number of users', result.length);
    numberOfUser = result.length
    console.log('123', result)
    res.status(201).json(result);
    // let response={

    // };
    // result.forEach((expense)=>{
    //   if(response[expence.userId]){
    //     response[expense.id].push(expense); 
    //   }
    //   else{
    //     response[expense.userId]=[];
    //     response[expense.userId].push(expense)

    //   }

    // })
    // console.log('all expense of every user',response);
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

exports.getexpense = (req, res, next) => {
  const userId = req.query.id || 1;
  console.log('user id >>>>>>>> ', userId);

  Expense.findAll(userId).then(result => {
    console.log('controllers/expense/getexpense line 72 ', result);
    res.status(200).json(result);
  }).catch(err => {
    console.log(err);
  })
}

exports.getExpense = (req, res, next) => {

  const userId = req.user._id;



  ////MySql
  //   const page=+req.query.page||1;
  //   const itemsPerPage=2;
  //   console.log('checking page',page);
  //   let totalItems;

  //    // console.log('req.user controller',req.user);
  //  Expence.count({where:{userId:req.user.dataValues.id}}).then(result=>{
  //  totalItems=result;
  //  return Expence.findAll({
  //   where:{userId:req.user.dataValues.id},
  //   offset:(page-1)*itemsPerPage,
  //         limit:itemsPerPage
  //  })
  //  // console.log('req.user again',req.user.dataValues.ispremiumuser);

  //  }).then(expense=>{
  //    if(req.user.dataValues.ispremiumuser){

  //      res.status(201).json({
  //       expense:expense,
  //       totalProducts: totalItems,
  //       currentPage:page,
  //       hasNextPage: itemsPerPage * page < totalItems,
  //       nextPage: page + 1,
  //       hasPreviousPage: page > 1,
  //       previousPage: page - 1,
  //       lastPage: Math.ceil(totalItems / itemsPerPage)
  //      });
  //    }
  //    else{
  //      res.status(200).json({
  //       expense:expense,
  //       totalProducts: totalItems,
  //       currentPage:page,
  //       hasNextPage: itemsPerPage * page < totalItems,
  //       nextPage: page + 1,
  //       hasPreviousPage: page > 1,
  //       previousPage: page - 1,
  //       lastPage: Math.ceil(totalItems / itemsPerPage)
  //      });
  //    }

  // })

  ////mongoDb

  Expense.fetchAll(userId).then(result => {
    console.log('controllers/expense/getexpense line 164 ', result);
    res.status(200).json(result);
  })
    .catch(err => {
      console.log(err);
    })
}


exports.deleteExpense = (req, res, next) => {
  const id = req.params.id;
  ////MySql 
  // expence.findByPk(id).then((user) => {
  //     return user.destroy(user);

  //   })
  //   .then(result => {
  //     console.log('user has been deleted');
  //     res.status(201).json(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  Expense.deleteById(id)
    .then(result => {
      console.log('user has been deleted');
      res.status(201).json(result);
    }).catch((err) => {
      console.log(err);
    })
}

async function uploadTOS3(data,fileName){
  const BUCKET_NAME='expensetracker1';
  const ACCESS_KEY_ID='AKIA3RJDBF47LK3HDCAT';
  const SECRETE_KEY_ID='fYSZUNOPRYx/D3TtB+FISEeA+pjsZ3cNekhLZ/gq';

  let s3bucket=new AWS.S3({
    accessKeyId:ACCESS_KEY_ID,
    secretAccessKey:SECRETE_KEY_ID
  })

  s3bucket.createBucket(async ()=>{
    var params={
      Bucket:BUCKET_NAME,
      Key:fileName,
      Body:data,
      ACL:'public-read'
    }
    return new Promise( ( resolve, reject ) => {
      s3bucket.upload( params, ( err, s3response ) => {
        if ( err ) {
          reject( err );
        }
        resolve( s3response );
      } )
    })
  })
}



exports.downloadexpense=async(req,res,next)=>{
const expense=await Expense.findAll(req.user._id);
//console.log('download expenses >>>>>',expense);
const stringifiedExpenses=JSON.stringify(expense);
const userId=req.user._id;
// const image=req.file;
// console.log('controllers/ecpense/download line 182',image)

const fileName=`Expense${userId}.txt/${new Date()}`;
const fileURL=await uploadTOS3(stringifiedExpenses,fileName);
console.log('file url >>>>>>> ',fileURL);
res.status(200).json(fileURL);
}













// exports.editExpence=(req,res,next)=>{
//         const id=req.params.id;
//     }
