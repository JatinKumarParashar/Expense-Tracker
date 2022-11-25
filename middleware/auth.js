const jwt=require('jsonwebtoken');
const User=require('../models/user');

exports.authenticate=(req,res,next)=>{
    const token=req.header('Authorization');
    console.log(token);
    const userid=jwt.verify(token,'JatinKumarParshar');
    console.log('userid >>>>>> ',userid.user);
    User.findById(userid.user).then(user=>{
       console.log('user in auth',user);
        req.user=user;
       console.log('req.user >>>>>>>>>',req.user);
        next();
    }).catch(err=>{
        console.log(err);
    })
}