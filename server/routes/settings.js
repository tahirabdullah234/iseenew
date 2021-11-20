var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var User = require('../models/user');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/change_password', authenticate.verifyUser, (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err)
            res.json({
                success: false,
                message: err.name
            })
        else if (user) {
            user.changePassword(req.body.oldpassword, req.body.newpassword, (err) => {
                if (err) {
                    if (err.name === 'IncorrectPasswordError') {
                        res.json({
                            success: false,
                            message: 'Incorrect password'
                        }); // Return error
                    } else {
                        res.json({
                            success: false,
                            message: 'Something went wrong!! Please try again after sometimes.'
                        });
                    }
                } else {
                    res.json({
                        success: true,
                        message: 'Your password has been changed successfully'
                    });
                }

            })
        } else {
            res.json({
                success: false,
                message: 'User not found'
            }); // Return error, user was not found in db
        }
    })
})

router.patch('/update_basic', authenticate.verifyUser, (req, res) => {
    console.log(req.body)
    User.findById(req.user.id, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: err.name
            })
        }
        else if (user) {
            user.fname = req.body.fname;
            user.lname = req.body.lname;
            user.gender = req.body.gender;
            user.dob = req.body.dob;
            user.save((err, user) => {
                if (err)
                    res.json({
                        success: false,
                        message: err.name
                    })
                else
                    res.json({
                        success: true,
                        user: user,
                        message: 'Basic Profile Updated Successfully'
                    })
            })
        }
        else
            res.json({
                success: false,
                message: 'User not Found'
            })
    })
})

router.put("/update_email", authenticate.verifyUser, (req, res) => {
    const email = req.body.email
    User.findById(req.user._id, (err, user) => {
        if (err) {
            res.json({
                success: false,
                err: err.name,
                test: "testig"
            })
        } else if (user) {
            user.username = email;
            user.save((err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        err: err.name,
                        test: "testing123"
                    })
                } else {
                    res.json({
                        success: true,
                        user
                    })
                }
            })
        } else {
            res.json({
                success: false,
                err: "User Not Found"
            })
        }
    })
})

module.exports = router;
