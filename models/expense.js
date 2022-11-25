
// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');


// const Expence = sequelize.define('expence', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     ammount: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.TEXT,
//         allowNull: false,


//     },
//     category: {
//         type: Sequelize.STRING,
//         allowNull: false,

//     }

// })

// module.exports = Expence;




// mongodb
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Expense {
    constructor(ammount, description, category, id, userId) {
        this.ammount = ammount;
        this.description = description;
        this.category = category;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }
    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('products')
                .updateOne({ _id: this._id }, { $set: this });
        }
        else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                console.log(err);
            })

    }

    static fetchAll(userId) {
        const db = getDb();
        return db
            .collection('products')
            .find({ userId: userId })
            .toArray()
            .then(products => {
               // console.log('expense in models line 77 ', products);
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    static findAll(userId) {
        const db = getDb();
        return db
            .collection('products')
            .find({ userId: userId })
            .toArray()
            .then(products => {
                console.log('expense in models line 77 ', products);
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }
    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(product => {
                // console.log('models/product.js/ findbyid line 71',product);
                return product;
            })
    }

}


module.exports = Expense;

