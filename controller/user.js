const user = require('../models/user');
const { json } = require('body-parser');
const { where } = require('sequelize');




exports.postSignUp = (req, res, next) => {
    console.log('Routes is working well');
    const username = req.body.user;
    const email = req.body.email;
    const password = req.body.pass;
    console.log('123', username, password, email);
    user.create({
        username: username,
        email: email,
        password: password
    }).then((data) => {
        res.status(201).json(data);
    }).catch(err => {
        console.log(err);
        console.log('Or you have entered existing email');
    })



}

exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    user.findAll({where:{email:email}})
    .then((users)=>{
        if(users[0].dataValues.password==password){

            res.status(201).json(users)
        }
        else{
            res.status(501).json();
        }
    })
    .catch(err=>{
       // alert('User does not exist')

        console.log(err);
        res.status(500).json();
    })
}