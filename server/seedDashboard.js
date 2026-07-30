var mongoose = require("mongoose");
var BP = require("./models/bp");
var BG = require("./models/bg");
var Appointment = require("./models/appointments");
var Request = require("./models/request");
var User = require("./models/user");
var Doctor = require("./models/doctor");

mongoose.connect("mongodb://localhost:27017/isee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed() {
  try {
    const users = await User.find({});
    const doctors = await Doctor.find({});

    if (users.length === 0) {
      console.log("No users found. Run seed.js first.");
      process.exit(1);
    }

    console.log(`Found ${users.length} users, ${doctors.length} doctors`);

    await BP.deleteMany({});
    await BG.deleteMany({});
    await Appointment.deleteMany({});
    await Request.deleteMany({});

    for (const user of users) {
      const bpRecords = [];
      const bgRecords = [];

      for (let day = 6; day >= 0; day--) {
        const date = new Date();
        date.setDate(date.getDate() - day);
        date.setHours(8 + day, 0, 0, 0);

        const sysBase = user.isDoctor ? 125 : 118;
        const dysBase = user.isDoctor ? 82 : 77;

        bpRecords.push({
          patient: user._id,
          systolic: sysBase + Math.floor(Math.random() * 15 - 5),
          dystolic: dysBase + Math.floor(Math.random() * 10 - 3),
          dateAdded: date,
        });

        bgRecords.push({
          patient: user._id,
          value: 90 + Math.floor(Math.random() * 30),
          isFasting: true,
          dateAdded: date,
        });

        const randomDate = new Date(date);
        randomDate.setHours(14, 0, 0, 0);
        bgRecords.push({
          patient: user._id,
          value: 130 + Math.floor(Math.random() * 60),
          isFasting: false,
          dateAdded: randomDate,
        });
      }

      await BP.insertMany(bpRecords);
      await BG.insertMany(bgRecords);
      console.log(`  Created health data for ${user.fname} ${user.lname}`);
    }

    var aptIndex = 0;
    for (const user of users) {
      if (!user.isDoctor && doctors.length > 0) {
        const doc = doctors[aptIndex % doctors.length];
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3 + aptIndex * 5);

        const times = ["09:00", "10:30", "14:00", "16:30"];
        const apt = new Appointment({
          p_id: user._id,
          d_id: doc.userid,
          date: futureDate,
          time: times[aptIndex % times.length],
          name: user.fname + " " + user.lname,
        });
        await apt.save();
        console.log(`  Created appointment for ${user.fname} ${user.lname} with doctor ${doc.userid}`);
        aptIndex++;
      }
    }

    for (const user of users) {
      if (!user.isDoctor && doctors.length > 0) {
        const doc = doctors[0];
        const req = new Request({
          p_id: user._id,
          d_id: doc._id,
          name: user.fname + " " + user.lname,
          msg: "I would like to schedule an appointment.",
        });
        await req.save();
        console.log(`  Created request for ${user.fname} ${user.lname}`);
      }
    }

    console.log("\nDashboard seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
