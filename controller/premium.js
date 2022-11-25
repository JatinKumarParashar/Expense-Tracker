const { json } = require('body-parser');
const { where } = require('sequelize');
const User=require('../models/user');

exports.getUser=(req,res,next)=>{
    User.findAll({where:{}})
}