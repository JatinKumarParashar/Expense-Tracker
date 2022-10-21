const express = require('express');
const bodyParsed = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
app = express();

const sequelize = require('./util/database');
app.use(bodyParsed.json());
app.use(bodyParsed.urlencoded({ extended: true }));

app.use(cors());

//routes
const signUpRoutes = require('./routes/signUp');
const expenseRoutes = require('./routes/Expense');
const purchaseRoutes=require('./routes/purchase');

const User=require('./models/user');
const Expense=require('./models/expense');
const Order=require('./models/order');


app.use('/user', signUpRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


sequelize //.sync({force:true})
    .sync()
    .then(()=>{
    app.listen(4000, () => {
        console.log(`Server started on 4000`);
    });

})