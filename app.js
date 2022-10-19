const express = require('express');
const bodyPersed = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

//routes
const signUpRoutes = require('./routes/signUp');


app = express();

app.use(cors());
app.use('/user', signUpRoutes);

app.listen(4000, () => {
    console.log(`Server started on 4000`);
});