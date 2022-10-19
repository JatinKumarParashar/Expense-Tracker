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




app.use('/user', signUpRoutes);


sequelize.sync().then(()=>{
    app.listen(4000, () => {
        console.log(`Server started on 4000`);
    });

})