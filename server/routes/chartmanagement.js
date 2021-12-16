var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var BP = require("../models/bp");
var BG = require("../models/bg");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/add_bg_record", authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  BG.create(req.body, (err, data) => {
    if (err)
      res.json({
        err: err,
        success: false,
      });
    else
      res.json({
        record: data,
        success: true,
      });
  });
});

router.post("/add_bp_record", authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  BP.create(req.body, (err, data) => {
    if (err)
      res.json({
        err: err,
        success: false,
      });
    else
      res.json({
        record: data,
        success: true,
      });
  });
});

router.get("/get_bp_record", authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  BP.find({ patient: req.user._id })
    .sort({ $natural: -1 })
    .limit(5)
    .exec((err, record) => {
      if (err)
        res.json({
          err: err,
          success: false,
        });
      else
        res.json({
          record: record,
          success: true,
        });
    });
});

router.get("/get_bg_record", authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  BG.find({ patient: req.user._id })
    .sort({ $natural: -1 })
    .limit(5)
    .exec((err, record) => {
      if (err)
        res.json({
          err: err,
          success: false,
        });
      else
        res.json({
          record: record,
          success: true,
        });
    });
});

router.get("/bg_graph", authenticate.verifyUser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  BG.find({ patient: req.user._id }, (err, record) => {
    if (err)
      res.json({
        success: false,
        err: err,
      });
    else if (record) {
      var fasting = [];
      var random = [];
      var fdates = [];
      var rdates = [];
      for (var i = 0; i < record.length; i++) {
        if (record[i].isFasting) {
          fasting.push(record[i].value);
          fdates.push(record[i].dateAdded.getDay());
        } else {
          random.push(record[i].value);
          rdates.push(record[i].dateAdded.getDay());
        }
      }
      // const diff = rdates.length - fdates.length;

      res.json({
        success: true,
        record: {
          fdates: fdates,
          fasting: fasting,
          rdates: rdates,
          random: random,
        },
      });
    } else {
      res.json({
        success: false,
        record: {
          fdates: [],
          fasting: [],
          rdates: [],
          random: [],
        },
      });
    }
  });
});

router.get("/bg_graph/:id", authenticate.verifyUser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  BG.find({ patient: req.params.id }, (err, record) => {
    if (err)
      res.json({
        success: false,
        err: err,
      });
    else if (record) {
      var fasting = [];
      var random = [];
      var fdates = [];
      var rdates = [];
      for (var i = 0; i < record.length; i++) {
        if (record[i].isFasting) {
          fasting.push(record[i].value);
          fdates.push(record[i].dateAdded.getDay());
        } else {
          random.push(record[i].value);
          rdates.push(record[i].dateAdded);
        }
      }
      res.json({
        success: true,
        record: {
          fdates: fdates,
          fasting: fasting,
          rdates: rdates,
          random: random,
        },
      });
    } else {
      res.json({
        success: false,
        record: {
          fdates: [],
          fasting: [],
          rdates: [],
          random: [],
        },
      });
    }
  });
});

router.get("/bp_graph", authenticate.verifyUser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  console.log(req.user);
  BP.find({ patient: req.user._id }, (err, record) => {
    if (err)
      res.json({
        success: false,
        err: err,
      });
    else if (record.length > 0) {
      var dates = [];
      var systolic = [];
      var dystolic = [];
      for (var i = 0; i < record.length; i++) {
        dates.push(record[i].dateAdded.getDay());
        systolic.push(record[i].systolic);
        dystolic.push(record[i].dystolic);
      }
      res.json({
        success: true,
        record: {
          dates: dates,
          systolic: systolic,
          dystolic: dystolic,
        },
      });
    } else {
      res.json({
        success: false,
        record: {
          dates: [],
          systolic: [],
          dystolic: [],
        },
      });
    }
  });
});


router.get("/bp_graph/:id", authenticate.verifyUser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  BP.find({ patient: req.params.id }, (err, record) => {
    if (err)
      res.json({
        success: false,
        err: err,
      });
    else if (record.length > 0) {
      var dates = [];
      var systolic = [];
      var dystolic = [];
      for (var i = 0; i < record.length; i++) {
        dates.push(record[i].dateAdded.getDay());
        systolic.push(record[i].systolic);
        dystolic.push(record[i].dystolic);
      }
      res.json({
        success: true,
        record: {
          dates: dates,
          systolic: systolic,
          dystolic: dystolic,
        },
      });
    } else {
      res.json({
        success: false,
        record: {
          dates: [],
          systolic: [],
          dystolic: [],
        },
      });
    }
  });
});

router.get('/bp_avg', authenticate.verifyUser, (req, res) => {
  BP
    .aggregate([
      {
        $match: {
          patient: req.user._id,
        }
      },
      {
        $group: {
          _id: "$patient",
          sysAvg: {
            $avg: '$systolic'
          },
          dysAvg: {
            $avg: '$dystolic'
          },
        }
      }
    ])
    .exec((err, avg) => {
      console.log(avg)
      if (err) {
        res.json({
          success: false,
          err: err.name
        })
      } else {
        res.json({
          success: true,
          avg: avg[0],
        })
      }
    })
})

router.get('/bg_avg_fasting', authenticate.verifyUser, (req, res) => {
  BG
    .aggregate([
      {
        $match: {
          patient: req.user._id,
          isFasting: true
        }
      },
      {
        $group: {
          _id: "$patient",
          fastingAvg: {
            $avg: '$value'
          },
        }
      }
    ])
    .exec((err, avg) => {
      console.log(avg)
      if (err) {
        res.json({
          success: false,
          err: err.name
        })
      } else {
        res.json({
          success: true,
          avg: avg[0]
        })
      }
    })
})

router.get('/bg_avg_random', authenticate.verifyUser, (req, res) => {
  BG
    .aggregate([
      {
        $match: {
          patient: req.user._id,
          isFasting: false
        }
      },
      {
        $group: {
          _id: "$patient",
          randomAvg: {
            $avg: '$value'
          },
        }
      }
    ])
    .exec((err, avg) => {
      console.log(avg)
      if (err) {
        res.json({
          success: false,
          err: err.name
        })
      } else {
        res.json({
          success: true,
          avg: avg[0],
        })
      }
    })
})

module.exports = router;
