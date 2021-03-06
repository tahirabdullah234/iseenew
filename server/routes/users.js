var express = require('express');
var multer = require('multer');
var User = require('../models/user');
var Dataset = require('../models/dataset')
var passport = require('passport');
var authenticate = require('../authenticate');
var router = express.Router();
const nodemailer = require('nodemailer');
var generator = require('generate-password');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abdullah.jankhan445@gmail.com',
    pass: 'khanabjankhan98'
  }
});

router.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, 'images/' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/upload', authenticate.verifyUser, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(req.file);
  });
});

router.post('/register', (req, res, next) => {
  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        console.log(err)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false });
      } else {
        if (req.body.firstname)
          user.fname = req.body.firstname;
        if (req.body.lastname)
          user.lname = req.body.lastname;
        if (req.body.dob)
          user.dob = req.body.dob;
        if (req.body.gender)
          user.gender = req.body.gender
        if (req.body.city)
          user.city = req.body.city
        if (req.body.isDoctor)
          user.isDoctor = req.body.isDoctor
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if (user.isDoctor)
              res.json({ success: true, id: user._id });
            else
              res.json({ success: true });
          });
        });
      }
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    token: token,
    status: 'You are successfully logged in!',
    user: req.user
  });
});

router.get('/get_user/:id', authenticate.verifyUser, (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      res.json({
        err: err,
        success: false
      })
    else if (user) {
      res.json({
        user: user,
        success: true
      })
    } else {
      res.json({
        success: false
      })
    }
  })
})


router.post('/add_new_data', authenticate.verifyUser, (req, res) => {
  console.log(req.body)
  const dataset = new Dataset(req.body)
  dataset.save((err, data) => {
    if (err) res.json({ success: false, message: err.name })
    else res.json({ success: true, data: data })
  })
})

// sample code to upload a profile picture

const storage_pp = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, 'images/' + req.user._id + "." + file.mimetype.split('/')[1])
  }
})

const upload_pp = multer({ storage: storage_pp }).single('file')

router.post("/uploadprofilepicture", authenticate.verifyUser, (req, res) => {
  upload_pp(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(req.file);
  });
})

router.post('/forgotpass', (req, res, next) => {
  const email = req.body.username;
  console.log(req.body.username)
  User.findOne({ username: email }, (err, user) => {
    if (err) {
      console.log(err)
      res.json({
        err: err.name,
        success: false
      })
    } else if (user) {
      var newPass = generator.generate({
        length: 8,
        numbers: true,
        uppercase: false,
        excludeSimilarCharacters: true,
      });
      console.log(String(newPass))
      user.setPassword(String(newPass), (err, user) => {
        if (err) {
          console.log(err)
          res.json({
            err: err.name,
            success: false
          })
        } else {
          user.save((err) => {
            if (err) {
              console.log(err.name)
              res.json({
                err: err.name,
                success: false
              })
            } else {
              passport.authenticate('local')(req, res, () => { });
              var mailOptions = {
                from: 'abdullah.jankhan445@gmail.com',
                to: email,
                subject: 'New Password for ISEE | Diabetic Retinopathy Detection System',
                text: 'Your new password is: ' + String(newPass)
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log(err.name)
                  res.json({ err: err.name, success: false })
                } else {
                  res.json({ data: 'Email sent: ' + info.response, success: true });
                }
              });
            }
          })
        }
      })
    } else {
      res.json({
        err: 'No User Found',
        success: false,
      })
    }
  })
})

module.exports = router;
