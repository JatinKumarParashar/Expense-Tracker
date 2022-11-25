const uuid = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Forgotpassword = require('../models/forget-password');
const mongodb = require('mongodb');


const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findByEmailId(email)
        if (user) {
            const id = uuid.v4();
            const fp = new Forgotpassword(id, true, user._id.toString())
            fp.save()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    throw new Error(error);
                })


        } else {
            throw new Error('User doesnt exist')
        }
    } catch (err) {
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}

const resetpassword = (req, res) => {
    const id = req.params.id;
    Forgotpassword.findOne(id).then(forgotpasswordrequest => {
        if (forgotpasswordrequest) {
            Forgotpassword.update(id);
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
            )
            res.end()

        }
    })
}

const updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpassword.findOne(resetpasswordid).then(resetpasswordrequest => {
            User.findById(resetpasswordrequest.userId).then(user => {
                // console.log('userDetails', user)
                if (user) {


                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        if (err) {
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function (err, hash) {

                            if (err) {
                                console.log(err);
                                throw new Error(err);
                            }
                            User.updatePassword(resetpasswordrequest.userId, hash).then(() => {
                                res.status(201).json({ message: 'Successfuly update the new password' })
                            })
                        });
                    });
                } else {
                    return res.status(404).json({ error: 'No user Exists', success: false })
                }
            })
        })
    } catch (error) {
        return res.status(403).json({ error, success: false })
    }

}


module.exports = {
    forgotpassword,
    updatepassword,
    resetpassword
}