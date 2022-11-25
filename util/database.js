




// const Sequelize = require('sequelize');


// const sequelize = new Sequelize('expense', 'root', 'Vijay@123', {
//     dialect: 'mysql',
//     host: 'localhost'
// });

// module.exports = sequelize;




const e = require('express');
const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect=(callback)=>{
    
    MongoClient.connect(`mongodb+srv://Jatin:Jatin1411@expense-tracker.z5elsjk.mongodb.net/test`)
    .then(client=>{
        console.log('Connected!!');
        _db=client.db();
        callback();
    })
    .catch(err=>{
        console.log(err);
        throw err;
    })

}

const getDb=()=>{
    if(_db){
        return _db;
    }
    throw 'No database Found';
}


exports.mongoConnect=mongoConnect;
exports.getDb=getDb;


