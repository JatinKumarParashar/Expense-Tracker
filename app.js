const express = require('express');
const bodyParsed = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
app = express();

// const sequelize = require('./util/database');
const mongoConnect = require('./util/database').mongoConnect;
app.use(bodyParsed.json());
app.use(bodyParsed.urlencoded({ extended: true }));

app.use(cors());

// //routes
const signUpRoutes = require('./routes/user');
const expenseRoutes = require('./routes/Expense');
const purchaseRoutes=require('./routes/purchase');
const forgetPasswordRoutes=require('./routes/password');

// const User=require('./models/user');
// const Expense=require('./models/expense');
// const Order=require('./models/order');
// const Forgotpassword=require('./models/forget-password');


app.use('/user', signUpRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/password',forgetPasswordRoutes);

// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);


// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);

// //MySql
// sequelize //.sync({force:true})
//     .sync()
//     .then(()=>{
//     app.listen(4000, () => {
//         console.log(`Server started on 4000`);
//     });

// })

mongoConnect(()=>{
    app.listen(4000);
})
