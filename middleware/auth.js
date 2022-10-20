const jwt=require('jsonwebtoken');
const user=require('../models/user');

exports.authenticate=(req,res,next)=>{
    const token=req.header('Authorization');
    console.log(token);
    const userid=jwt.verify(token,'JatinKumarParshar');
    console.log('userid >>>>>> ',userid.user);
    user.findByPk(userid.user).then(user=>{
        req.user=user;
        next();
    }).catch(err=>{
        console.log(err);
    })
}