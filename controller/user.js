const user = require('../models/user');
const { json } = require('body-parser');
const { where } = require('sequelize');
const bcrypt=require('bcrypt');




exports.postSignUp = (req, res, next) => {
    console.log('Routes is working well');
    const username = req.body.user;
    const email = req.body.email;
    const password = req.body.pass;
    console.log('123', username, password, email);
    bcrypt.hash(password,10,async(err,hash)=>{
        user.create({
            username: username,
            email: email,
            password: hash
        }).then((data) => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            console.log('Or you have entered existing email');
        })
    })



}

exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    user.findAll({where:{email:email}})
    .then((users)=>{
        bcrypt.compare(password,users[0].dataValues.password,(err,result)=>{

            if(result==true){
    
                res.status(201).json(users)
            }
            else{
                res.status(401).json();
            }
        })
    })
    .catch(err=>{
       // alert('User does not exist')

        console.log(err);
        res.status(404).json();
    })
}