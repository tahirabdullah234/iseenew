var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Request = require('../models/request');
var Doctor = require('../models/doctor');
var Appointment = require('../models/appointments');
var Message = require('../models/message');
var User = require('../models/user');
var Chat = require('../models/chats');

router.post('/add_request', authenticate.verifyUser, (req, res) => {
    Request.create(req.body, (err, data) => {
        if (err)
            res.json({
                success: false,
                err: err
            })
        else {
            Doctor.findById(req.body.d_id, (err, data) => {
                console.log("Sample Data:" + data);
                const d_id = data.userid;
                Chat.create({
                    p_id: req.user._id,
                    d_id,
                }, (err, data) => {
                    if (err) {
                        res.json({
                            err: err.name,
                            success: false
                        })
                    } else {
                        Message.create({
                            p_id: req.body.p_id,
                            d_id,
                            msg: req.body.msg,
                        }, (err, msg) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    err: err.name,
                                })
                            } else {
                                res.json({
                                    success: true,
                                    data: data
                                })
                            }
                        })
                    }
                })
            })
        }
    })
})

router.get('/get_requests', authenticate.verifyUser, (req, res) => {
    Request.find({ p_id: req.user._id }, (err, data) => {
        if (err)
            res.json({
                success: false,
                err: err
            })
        else if (data.length > 0) {
            var d_id = []
            for (var i = 0; i < data.length; i++) {
                d_id.push(data[i].d_id)
            }
            res.json({
                success: true,
                data: d_id
            })
        }
        else {
            res.json({
                success: false,
                err: 'No Record Found'
            })
        }
    })
})

router.get('/recieved_req', authenticate.verifyUser, (req, res) => {
    Doctor.findOne({ userid: req.user._id }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: err.name
            })
        }
        else if (user) {
            Request.find({ d_id: user._id }, (err, requests) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err.name
                    })
                }
                else if (requests.length > 0) {
                    res.json({
                        success: true,
                        requests: requests,
                        message: 'Request Fetched'
                    })
                }
                else {
                    res.json({
                        success: false,
                        message: 'No Record Found'
                    })
                }
            })
        }
        else {
            res.json({
                success: false,
                message: 'User Not Found'
            })
        }
    })
})

router.delete('/delete_req/:p_id/:d_id', authenticate.verifyUser, (req, res) => {
    Request.deleteOne({ p_id: req.params.p_id, d_id: req.params.d_id }, (err) => {
        if (err)
            res.json({
                success: false,
            })
        else
            res.json({
                success: true,
            })
    })
})
// from patient only

router.post('/accept_req', authenticate.verifyUser, (req, res) => {
    Request.deleteOne({ p_id: req.body.p_id, d_id: req.body.d_id }, (err) => {
        if (err)
            res.json({
                success: false,
            })
        else {
            var appointment = new Appointment({
                p_id: req.body.p_id,
                d_id: req.body.d_id,
                date: req.body.date,
                time: req.body.time,
                name: req.body.name,
            })
            appointment.save((err, apt) => {
                if (err) {
                    res.json({
                        success: false,
                        err: err.name,
                    })
                } else {
                    res.json({
                        success: true,
                        apt,
                    })
                }
            })
        }
    })
})


router.get('/get_apponitment', authenticate.verifyUser, (req, res) => {
    Doctor.findOne({ userid: req.user._id }, (err, doc) => {
        console.log(doc)
        if (err) {
            res.json({
                err: err.name,
                success: false
            })
        } else {
            Appointment.find({ d_id: doc._id, date: { '$gte': Date.now(), } }, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        err: err.name
                    })
                } else {
                    res.json({
                        success: true,
                        data
                    })
                }
            })
        }
    })
})

router.get('/patient/get_chat', authenticate.verifyUser, (req, res) => {
    Chat.find({ p_id: req.user._id })
        .populate('d_id')
        .then((data, err) => {
            console.log(err)
            console.log(data)
            if (err) {
                res.json({
                    err: err.name,
                    success: false
                })
            } else {
                res.json({
                    success: true,
                    chats: data
                })
            }
        })
})

router.get('/doctor/get_chat', authenticate.verifyUser, (req, res) => {
    Chat.find({ d_id: req.user._id })
        .populate('p_id')
        .then((data, err) => {
            console.log(err)
            console.log(data)
            if (err) {
                res.json({
                    err: err.name,
                    success: false
                })
            } else {
                res.json({
                    success: true,
                    chats: data
                })
            }
        })
})

router.get('/patient/messages', authenticate.verifyUser, (req, res) => {
    console.log(req.body)
    Message.find({ d_id: req.body.d_id }, (err, msgs) => {
        console.log(msgs)
        if (err) {
            res.json({
                success: false,
                err: err.name
            })
        } else {
            res.json({
                success: true,
                msgs,
            })
        }
    })
})

router.get('/doctor/messages', authenticate.verifyUser, (req, res) => {
    console.log(req.body)
    Message.find({ p_id: req.body.p_id }, (err, msgs) => {
        if (err) {
            res.json({
                success: false,
                err: err.name
            })
        } else {
            res.json({
                success: true,
                msgs,
            })
        }
    })
})

module.exports = router;

