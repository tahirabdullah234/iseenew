var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var BP = require("../models/bp");
var BG = require("../models/bg");
var User = require("../models/user");
var Doctor = require("../models/doctor");
var Request = require("../models/request");
var Appointment = require("../models/appointments");

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
    else if (record.length > 0) {
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
          avg: avg[0] || { sysAvg: 120, dysAvg: 80 },
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
          avg: avg[0] || { fastingAvg: 120 },
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
          avg: avg[0] || { randomAvg: 200 },
        })
      }
    })
})


router.get("/databp", authenticate.verifyUser, (req, res) => {
  var olddate = new Date();
  olddate.setDate(olddate.getDate() - 7);
  BP.find({ patient: req.user._id, dateAdded: { '$gte': olddate } }, (err, record) => {
    if (err)
      res.json({
        err: err.name,
        success: false
      })
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
  })
})

router.get("/databg", authenticate.verifyUser, (req, res) => {
  var olddate = new Date();
  olddate.setDate(olddate.getDate() - 7);
  BG.find({ patient: req.user._id, dateAdded: { '$gte': olddate } }, (err, record) => {
    console.log()
    if (err)
      res.json({
        err: err.name,
        success: false
      })
    else if (record.length > 0) {
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
  })
})

router.get("/databp/:_id", authenticate.verifyUser, (req, res) => {
  var olddate = new Date();
  olddate.setDate(olddate.getDate() - 7);
  BP.find({ patient: req.params._id, dateAdded: { '$gte': olddate } }, (err, record) => {
    if (err)
      res.json({
        err: err.name,
        success: false
      })
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

  })
})

router.get("/databg/:_id", authenticate.verifyUser, (req, res) => {
  var olddate = new Date();
  olddate.setDate(olddate.getDate() - 7);
  BG.find({ patient: req.params._id, dateAdded: { '$gte': olddate } }, (err, record) => {
    if (err)
      res.json({
        err: err.name,
        success: false
      })
    else if (record.length > 0) {
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
  })
})


router.get("/patient_activity", authenticate.verifyUser, async (req, res) => {
  try {
    const docProfile = await Doctor.findOne({ userid: req.user._id });
    const [requests, appointments] = await Promise.all([
      Request.find(docProfile ? { d_id: docProfile._id } : { _id: null }).lean(),
      Appointment.find({ d_id: req.user._id }).lean(),
    ]);

    const ids = new Set();
    requests.forEach(r => ids.add(String(r.p_id)));
    appointments.forEach(a => ids.add(String(a.p_id)));

    const patients = await User.find({ _id: { $in: Array.from(ids) } }).lean();
    const nameMap = {};
    patients.forEach(p => { nameMap[String(p._id)] = p.fname + " " + p.lname; });

    const activity = [];
    for (const id of ids) {
      const [latestBP, latestBG] = await Promise.all([
        BP.findOne({ patient: id }).sort({ dateAdded: -1 }).lean(),
        BG.findOne({ patient: id }).sort({ dateAdded: -1 }).lean(),
      ]);
      const lastTs = Math.max(
        latestBP ? new Date(latestBP.dateAdded).getTime() : 0,
        latestBG ? new Date(latestBG.dateAdded).getTime() : 0
      );
      activity.push({
        patient: id,
        name: nameMap[id] || "Patient",
        bp: latestBP || null,
        bg: latestBG || null,
        lastActivity: lastTs,
      });
    }

    activity.sort((a, b) => b.lastActivity - a.lastActivity);
    res.json({ success: true, data: activity.slice(0, 10) });
  } catch (err) {
    res.json({ success: false, err: err.name });
  }
});


module.exports = router;
