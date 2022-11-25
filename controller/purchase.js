
const Razorpay = require('razorpay');
const Order = require('../models/order')
const User=require('../models/user');


const purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: 'rzp_test_b2057MgjiAs7U6',
            key_secret: 'SO07qpHHsMVL1jGcVXtjeXIl'
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(err);
            }
            const orderCreate = new Order(null, order.id, 'PENDING', null)
            orderCreate.save()
            .then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

 const updateTransactionStatus = (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        Order.ByOrderId(order_id).then(order => {
            console.log('response after matching order id order >>>>>>',order)
            const orderCreate=new Order(payment_id, order.orderId, 'SUCCESSFUL', order._id)
            orderCreate.save().then(() => {
                User.update(req.user._id)
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}