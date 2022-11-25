
// //MySql 
// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Forgotpassword = sequelize.define('forgotpassword', {
//     id: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active: Sequelize.BOOLEAN,
//     expiresby: Sequelize.DATE
// })

// module.exports = Forgotpassword;

////MongoDB
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectId = mongodb.ObjectId;

class ForgotPassword {
    constructor(id, active,userId, expiresBy){
        this.id=id;
        this.active=active;
        this.userId=userId;
        this.expiresBy=new Date();
    }
    save(){
        const db = getDb();
        return db.collection('forgotPassword').insertOne(this);
    }

    static findOne(id){
            const db = getDb();
            return db
                .collection('forgotPassword')
                .find({ _id: new ObjectId(id) })
                .next()
                .then(user => {
                    // console.log('models/customer/findbyid line 51',user);
                    return user;
                })
    }

    static update(id){
        const db = getDb();
        return db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: { active: true } });
    }

    

}

module.exports=ForgotPassword;
