
////MySql
// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name , password, phone number, role

// const Order = sequelize.define('order', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING
// })

// module.exports = Order;

//mongodb
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Order {
    constructor(paymentId, orderId, status, id) {
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.status = status;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('orders')
                .updateOne({ _id: this._id }, { $set: this });
        }
        else {
            dbOp = db.collection('orders').insertOne(this);
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

  static ByOrderId(orderId) {
        const db = getDb();
        return db
            .collection('orders')
            .find({ orderId: orderId })
            .next()
            .then(order => {
                //console.log('models/product.js/ findbyid line 71', product);
                return order;
            })
    }
}

module.exports = Order;