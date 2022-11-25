// //MySql
// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');


// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     username: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true


//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false,

//     },
//     ispremiumuser: Sequelize.BOOLEAN

// })

// module.exports = User;

//mongoDB
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(name, email, password, isPremium, expenses, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isPremium = isPremium;
        this.expenses = expenses;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static update(userId) {
        const db = getDb();
        return db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { isPremium: 1 } });

    }
    static updatePassword(userId,password) {
        const db = getDb();
        return db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { password: password } });

    }



    static findByEmailId(emailId) {
        const db = getDb();
        return db
            .collection('users')
            .find({ email: emailId })
            .next()
            .then(user => {
                // console.log('models/customer/findbyid line 51',user);
                return user;
            })
    }

    static findAll(){
        const db = getDb();
        return db
            .collection('users')
            .find()
            .toArray()
            .then(user => {
                 console.log('models/customer/findbyid line 51',user);
                return user;
            })
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .find({ _id: new ObjectId(userId) })
            .next()
            .then(user => {
                // console.log('models/customer/findbyid line 51',user);
                return user;
            })
    }


}

module.exports = User;
