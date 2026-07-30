var mongoose = require('mongoose');
var User = require('./models/user');
var Doctor = require('./models/doctor');
var Appointment = require('./models/appointments');
var BG = require('./models/bg');
var BP = require('./models/bp');
var Chats = require('./models/chats');
var Message = require('./models/message');
var Request = require('./models/request');
var Report = require('./models/report');
var Dataset = require('./models/dataset');
var TipCategory = require('./models/tipcat');
var Tip = require('./models/tipDetail');

mongoose.connect('mongodb://localhost:27017/isee', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seed() {
  try {
    // Clear all collections
    await Promise.all([
      User.deleteMany({}),
      Doctor.deleteMany({}),
      Appointment.deleteMany({}),
      BG.deleteMany({}),
      BP.deleteMany({}),
      Chats.deleteMany({}),
      Message.deleteMany({}),
      Request.deleteMany({}),
      Report.deleteMany({}),
      Dataset.deleteMany({}),
      TipCategory.deleteMany({}),
      Tip.deleteMany({})
    ]);
    console.log('Cleared all collections');

    // Create 2 patients
    var patient1 = await User.register(new User({
      username: 'john@test.com',
      fname: 'John',
      lname: 'Doe',
      gender: 'Male',
      isDoctor: false,
      dob: new Date('1990-05-15'),
      city: 'Karachi',
      photo: 1
    }), 'password123');

    var patient2 = await User.register(new User({
      username: 'jane@test.com',
      fname: 'Jane',
      lname: 'Smith',
      gender: 'Female',
      isDoctor: false,
      dob: new Date('1995-08-22'),
      city: 'Lahore',
      photo: 2
    }), 'password123');

    console.log('Created patients:', patient1.username, patient2.username);

    // Create 2 doctors
    var doctor1 = await User.register(new User({
      username: 'ali@test.com',
      fname: 'Ali',
      lname: 'Khan',
      gender: 'Male',
      isDoctor: true,
      dob: new Date('1980-03-10'),
      city: 'Karachi',
      photo: 3
    }), 'password123');

    var doctor2 = await User.register(new User({
      username: 'sara@test.com',
      fname: 'Sara',
      lname: 'Ahmed',
      gender: 'Female',
      isDoctor: true,
      dob: new Date('1985-11-18'),
      city: 'Islamabad',
      photo: 4
    }), 'password123');

    console.log('Created doctors:', doctor1.username, doctor2.username);

    // Create Doctor profiles
    var docProfile1 = await Doctor.create({
      userid: doctor1._id,
      pmdcid: 'PMDC-12345',
      isVerified: true,
      specialization: 'Ophthalmologist'
    });

    var docProfile2 = await Doctor.create({
      userid: doctor2._id,
      pmdcid: 'PMDC-67890',
      isVerified: true,
      specialization: 'Endocrinologist'
    });

    console.log('Created doctor profiles');

    // Create BP records for both patients
    await BP.create([
      { patient: patient1._id, systolic: 120, dystolic: 80, dateAdded: new Date('2026-07-25') },
      { patient: patient1._id, systolic: 125, dystolic: 82, dateAdded: new Date('2026-07-26') },
      { patient: patient1._id, systolic: 118, dystolic: 78, dateAdded: new Date('2026-07-27') },
      { patient: patient1._id, systolic: 130, dystolic: 85, dateAdded: new Date('2026-07-28') },
      { patient: patient1._id, systolic: 122, dystolic: 81, dateAdded: new Date('2026-07-29') },
      { patient: patient2._id, systolic: 110, dystolic: 70, dateAdded: new Date('2026-07-25') },
      { patient: patient2._id, systolic: 115, dystolic: 75, dateAdded: new Date('2026-07-26') },
      { patient: patient2._id, systolic: 112, dystolic: 72, dateAdded: new Date('2026-07-27') },
      { patient: patient2._id, systolic: 118, dystolic: 76, dateAdded: new Date('2026-07-28') },
      { patient: patient2._id, systolic: 120, dystolic: 78, dateAdded: new Date('2026-07-29') }
    ]);

    // Create BG records for both patients
    await BG.create([
      { patient: patient1._id, value: 95, isFasting: true, dateAdded: new Date('2026-07-25') },
      { patient: patient1._id, value: 140, isFasting: false, dateAdded: new Date('2026-07-25') },
      { patient: patient1._id, value: 90, isFasting: true, dateAdded: new Date('2026-07-26') },
      { patient: patient1._id, value: 135, isFasting: false, dateAdded: new Date('2026-07-27') },
      { patient: patient1._id, value: 92, isFasting: true, dateAdded: new Date('2026-07-28') },
      { patient: patient2._id, value: 100, isFasting: true, dateAdded: new Date('2026-07-25') },
      { patient: patient2._id, value: 145, isFasting: false, dateAdded: new Date('2026-07-25') },
      { patient: patient2._id, value: 105, isFasting: true, dateAdded: new Date('2026-07-26') },
      { patient: patient2._id, value: 140, isFasting: false, dateAdded: new Date('2026-07-27') },
      { patient: patient2._id, value: 98, isFasting: true, dateAdded: new Date('2026-07-28') }
    ]);

    console.log('Created BP and BG records');

    // Create requests (patient1 -> doctor1)
    var request1 = await Request.create({
      p_id: patient1._id,
      d_id: doctor1._id,
      msg: 'I need an eye checkup',
      name: 'John Doe'
    });

    var request2 = await Request.create({
      p_id: patient2._id,
      d_id: doctor2._id,
      msg: 'Need diabetes consultation',
      name: 'Jane Smith'
    });

    console.log('Created requests');

    // Accept request1 -> create appointment
    var appointment1 = await Appointment.create({
      p_id: patient1._id,
      d_id: docProfile1._id,
      date: new Date('2026-08-05'),
      time: '10:00 AM',
      name: 'John Doe'
    });

    console.log('Created appointment');

    // Create chat between patient1 and doctor1
    var chat1 = await Chats.create({
      p_id: patient1._id,
      d_id: doctor1._id
    });

    // Create messages
    await Message.create([
      { p_id: patient1._id, d_id: doctor1._id, msg: 'Hello doctor, I have been experiencing blurred vision', patient: true },
      { p_id: patient1._id, d_id: doctor1._id, msg: 'Hello John, how long have you had this symptom?', patient: false },
      { p_id: patient1._id, d_id: doctor1._id, msg: 'For about 2 weeks now', patient: true },
      { p_id: patient1._id, d_id: doctor1._id, msg: 'Please come in for an eye examination', patient: false }
    ]);

    console.log('Created chat and messages');

    // Create report for patient1
    await Report.create({
      u_id: patient1._id,
      title: 'Eye Examination Report - July 2026',
      report: {
        diagnosis: 'Mild diabetic retinopathy detected',
        recommendations: 'Regular eye checkups, blood sugar control',
        scanResults: 'Grade 1 DR detected in left eye'
      },
      date: new Date('2026-07-28')
    });

    console.log('Created report');

    // Create dataset entry (retina scan record)
    await Dataset.create({
      u_id: patient1._id,
      scan: 'scan_sample.jpg',
      prediction: 1,
      probability: '85.5%',
      date: new Date('2026-07-28')
    });

    console.log('Created dataset entry');

    // Create tip categories
    var cat1 = await TipCategory.create({ category: 'Diabetes Management' });
    var cat2 = await TipCategory.create({ category: 'Eye Care' });
    var cat3 = await TipCategory.create({ category: 'Blood Pressure Control' });

    // Create tips
    await Tip.create([
      { cat_id: cat1._id, title: 'Monitor Blood Sugar Daily', text: 'Check your blood sugar levels regularly to maintain proper glucose control.', addedBy: docProfile2._id },
      { cat_id: cat1._id, title: 'Healthy Diet', text: 'Eat a balanced diet rich in fiber and low in processed sugars.', addedBy: docProfile2._id },
      { cat_id: cat2._id, title: 'Regular Eye Exams', text: 'Diabetic patients should have a comprehensive eye exam at least once a year.', addedBy: docProfile1._id },
      { cat_id: cat2._id, title: 'Screen Time Breaks', text: 'Take 20-second breaks every 20 minutes to reduce eye strain.', addedBy: docProfile1._id },
      { cat_id: cat3._id, title: 'Reduce Sodium Intake', text: 'Limit salt consumption to help maintain healthy blood pressure levels.', addedBy: docProfile2._id }
    ]);

    console.log('Created tip categories and tips');

    console.log('\n--- SEED COMPLETE ---');
    console.log('Login Credentials:');
    console.log('Patient 1 - email: ' + patient1.username + ', password: password123');
    console.log('Patient 2 - email: ' + patient2.username + ', password: password123');
    console.log('Doctor 1  - email: ' + doctor1.username + ', password: password123');
    console.log('Doctor 2  - email: ' + doctor2.username + ', password: password123');

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
