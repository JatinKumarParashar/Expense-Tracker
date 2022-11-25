const User = require('../models/user');
const { json } = require('body-parser');
const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



function generateAccessToken(id) {
    return jwt.sign({
        user: id
    }, 'JatinKumarParshar');
}




exports.postSignUp = (req, res, next) => {
    console.log('Routes is working well');
    const username = req.body.user;
    const email = req.body.email;
    const password = req.body.pass;
    const expenses = {
        expenses: []
    };
   // console.log('123', username, password, email);
    bcrypt.hash(password, 10, async (err, hash) => {
        const user = new User(username, email, hash, 0, expenses, null);
        user.save()
            .then((data) => {
                res.status(201).json(data);
            })
            .catch(err => {
                console.log(err);
                console.log('Or you have entered existing email');
            })
    })



}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmailId(email)
        .then((user) => {
            console.log('controllers/user.js/post login line 48',user)
            bcrypt.compare(password, user.password, (err, result) => {
                if (result == true) {
                    console.log('is premium from login >>>>', user._id.toString());
                    if (user.isPremium) {
                        res.status(201).json({ result: user, token: generateAccessToken(user._id.toString()) })
                    }
                    else {
                        res.status(200).json({ result: user, token: generateAccessToken(user._id.toString()) })
                    }
                }
                else {
                    res.status(401).json();
                }
            })
        })
        .catch(err => {
            // alert('User does not exist')

            console.log(err);
            res.status(404).json();
        })
}