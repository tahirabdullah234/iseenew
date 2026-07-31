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

    console.log(`Found ${users.length} users, ${doctors.length} doctors`);

    const extraPatients = [
      { username: "rohan@test.com", fname: "Rohan", lname: "Sharma", gender: "Male", city: "Delhi", photo: 2 },
      { username: "meera@test.com", fname: "Meera", lname: "Gupta", gender: "Female", city: "Mumbai", photo: 3 },
      { username: "osman@test.com", fname: "Osman", lname: "Raza", gender: "Male", city: "Karachi", photo: 4 },
      { username: "nadia@test.com", fname: "Nadia", lname: "Iqbal", gender: "Female", city: "Lahore", photo: 1 },
      { username: "peter@test.com", fname: "Peter", lname: "George", gender: "Male", city: "Dubai", photo: 5 },
      { username: "hina@test.com", fname: "Hina", lname: "Khan", gender: "Female", city: "Islamabad", photo: 3 },
    ];

    for (const p of extraPatients) {
      const exists = await User.findOne({ username: p.username });
      if (!exists) {
        await User.register(new User({ ...p, isDoctor: false, dob: new Date("1992-03-15") }), "password123");
        console.log(`  Created patient ${p.fname} ${p.lname}`);
      }
    }

    const allUsers = await User.find({});
    const patients = allUsers.filter(u => !u.isDoctor);

    await BP.deleteMany({});
    await BG.deleteMany({});
    await Appointment.deleteMany({});
    await Request.deleteMany({});

    for (const user of allUsers) {
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

      const noonBP = new Date();
      noonBP.setHours(12, 30, 0, 0);
      bpRecords.push({
        patient: user._id,
        systolic: (user.isDoctor ? 125 : 118) + Math.floor(Math.random() * 10 - 4),
        dystolic: (user.isDoctor ? 82 : 77) + Math.floor(Math.random() * 8 - 3),
        dateAdded: noonBP,
      });

      const eveningBP = new Date();
      eveningBP.setHours(19, 30, 0, 0);
      bpRecords.push({
        patient: user._id,
        systolic: (user.isDoctor ? 125 : 118) + Math.floor(Math.random() * 10 - 4),
        dystolic: (user.isDoctor ? 82 : 77) + Math.floor(Math.random() * 8 - 3),
        dateAdded: eveningBP,
      });

      const eveningBG = new Date();
      eveningBG.setHours(20, 15, 0, 0);
      bgRecords.push({
        patient: user._id,
        value: 140 + Math.floor(Math.random() * 50),
        isFasting: false,
        dateAdded: eveningBG,
      });

      await BP.insertMany(bpRecords);
      await BG.insertMany(bgRecords);
      console.log(`  Created health data for ${user.fname} ${user.lname}`);
    }

    const times = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "10:00", "10:00"];
    const reqMessages = [
      "I would like to schedule an eye checkup.",
      "I have been experiencing blurred vision lately.",
      "Need a consultation for my diabetes management.",
      "I would like to book a retina screening.",
      "Can you check my recent reports please?",
    ];

    var aptIndex = 0;
    for (const doc of doctors) {
      for (let i = 0; i < 10 && patients.length > 0; i++) {
        const patient = patients[aptIndex % patients.length];
        const futureDate = new Date();
        if (i < 6) {
          futureDate.setHours(9 + i * 2, 0, 0, 0);
        } else {
          futureDate.setDate(futureDate.getDate() + 1 + (i - 6) * 2);
          futureDate.setHours(10, 0, 0, 0);
        }

        const apt = new Appointment({
          p_id: patient._id,
          d_id: doc.userid,
          date: futureDate,
          time: times[aptIndex % times.length],
          name: patient.fname + " " + patient.lname,
        });
        await apt.save();
        console.log(`  Created appointment for ${patient.fname} ${patient.lname} with doctor ${doc.userid} on ${futureDate.toISOString()}`);
        aptIndex++;
      }
    }

    var reqIndex = 0;
    for (const doc of doctors) {
      for (let i = 0; i < 5 && patients.length > 0; i++) {
        const patient = patients[reqIndex % patients.length];
        const req = new Request({
          p_id: patient._id,
          d_id: doc._id,
          name: patient.fname + " " + patient.lname,
          msg: reqMessages[reqIndex % reqMessages.length],
        });
        await req.save();
        console.log(`  Created request for ${patient.fname} ${patient.lname} to doctor ${doc._id}`);
        reqIndex++;
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
