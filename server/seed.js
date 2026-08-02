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

    // Create 4 patients
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

    var patient3 = await User.register(new User({
      username: 'empty@test.com',
      fname: 'Mike',
      lname: 'Walker',
      gender: 'Male',
      isDoctor: false,
      dob: new Date('1992-01-10'),
      city: 'Karachi',
      photo: 3
    }), 'password123');

    var patient4 = await User.register(new User({
      username: 'sarah@test.com',
      fname: 'Sarah',
      lname: 'Khan',
      gender: 'Female',
      isDoctor: false,
      dob: new Date('1993-04-12'),
      city: 'Islamabad',
      photo: 4
    }), 'password123');

    var patient5 = await User.register(new User({
      username: 'nobody@test.com',
      fname: 'Noah',
      lname: 'Rehman',
      gender: 'Male',
      isDoctor: false,
      dob: new Date('1991-09-05'),
      city: 'Lahore'
    }), 'password123');

    console.log('Created patients:', patient1.username, patient2.username, patient3.username, patient4.username, patient5.username);

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

    var doctor3 = await User.register(new User({
      username: 'umar@test.com',
      fname: 'Umar',
      lname: 'Farooq',
      gender: 'Male',
      isDoctor: true,
      dob: new Date('1978-07-02'),
      city: 'Lahore',
      photo: 1
    }), 'password123');

    var doctor4 = await User.register(new User({
      username: 'aisha@test.com',
      fname: 'Aisha',
      lname: 'Malik',
      gender: 'Female',
      isDoctor: true,
      dob: new Date('1983-02-25'),
      city: 'Karachi',
      photo: 2
    }), 'password123');

    var doctor5 = await User.register(new User({
      username: 'bilal@test.com',
      fname: 'Bilal',
      lname: 'Hussain',
      gender: 'Male',
      isDoctor: true,
      dob: new Date('1975-09-14'),
      city: 'Multan',
      photo: 5
    }), 'password123');

    var doctor6 = await User.register(new User({
      username: 'fatima@test.com',
      fname: 'Fatima',
      lname: 'Zahra',
      gender: 'Female',
      isDoctor: true,
      dob: new Date('1988-06-30'),
      city: 'Faisalabad',
      photo: 1
    }), 'password123');

    var doctor7 = await User.register(new User({
      username: 'hassan@test.com',
      fname: 'Hassan',
      lname: 'Raza',
      gender: 'Male',
      isDoctor: true,
      dob: new Date('1981-12-08'),
      city: 'Rawalpindi',
      photo: 3
    }), 'password123');

    var doctor8 = await User.register(new User({
      username: 'nodoctor@test.com',
      fname: 'Usman',
      lname: 'Qureshi',
      gender: 'Male',
      isDoctor: true,
      dob: new Date('1986-04-19'),
      city: 'Karachi'
    }), 'password123');

    console.log('Created doctors:', doctor1.username, doctor2.username, doctor3.username, doctor4.username, doctor5.username, doctor6.username, doctor7.username, doctor8.username);

    // Create Doctor profiles
    var docProfile1 = await Doctor.create({
      userid: doctor1._id,
      pmdcid: 'PMDC-12345',
      isVerified: true,
      specialization: 'Ophthalmologist',
      experience: '12 years'
    });

    var docProfile2 = await Doctor.create({
      userid: doctor2._id,
      pmdcid: 'PMDC-67890',
      isVerified: true,
      specialization: 'Endocrinologist',
      experience: '8 years'
    });

    var docProfile3 = await Doctor.create({
      userid: doctor3._id,
      pmdcid: 'PMDC-11122',
      isVerified: true,
      specialization: 'Retina Specialist',
      experience: '15 years'
    });

    var docProfile4 = await Doctor.create({
      userid: doctor4._id,
      pmdcid: 'PMDC-22334',
      isVerified: true,
      specialization: 'Cardiologist',
      experience: '20 years'
    });

    var docProfile5 = await Doctor.create({
      userid: doctor5._id,
      pmdcid: 'PMDC-33445',
      isVerified: true,
      specialization: 'Diabetologist',
      experience: '6 years'
    });

    var docProfile6 = await Doctor.create({
      userid: doctor6._id,
      pmdcid: 'PMDC-44556',
      isVerified: true,
      specialization: 'General Physician',
      experience: '10 years'
    });

    var docProfile7 = await Doctor.create({
      userid: doctor7._id,
      pmdcid: 'PMDC-55667',
      isVerified: true,
      specialization: 'Ophthalmologist',
      experience: '9 years'
    });

    console.log('Created doctor profiles');

    // Create BP records for all patients (except patient3 kept empty for empty-state testing)
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
      { patient: patient2._id, systolic: 120, dystolic: 78, dateAdded: new Date('2026-07-29') },
      { patient: patient4._id, systolic: 128, dystolic: 84, dateAdded: new Date('2026-07-29') },
      { patient: patient4._id, systolic: 124, dystolic: 80, dateAdded: new Date('2026-07-30') },
      { patient: patient4._id, systolic: 132, dystolic: 86, dateAdded: new Date('2026-07-31') },
      { patient: patient4._id, systolic: 126, dystolic: 82, dateAdded: new Date('2026-08-01') }
    ]);

    // Create BG records for all patients (except patient3 kept empty for empty-state testing)
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
      { patient: patient2._id, value: 98, isFasting: true, dateAdded: new Date('2026-07-28') },
      { patient: patient4._id, value: 110, isFasting: true, dateAdded: new Date('2026-07-29') },
      { patient: patient4._id, value: 150, isFasting: false, dateAdded: new Date('2026-07-30') },
      { patient: patient4._id, value: 108, isFasting: true, dateAdded: new Date('2026-07-31') },
      { patient: patient4._id, value: 155, isFasting: false, dateAdded: new Date('2026-08-01') }
    ]);

    console.log('Created BP and BG records');

    // Create pending appointment requests (d_id is the Doctor profile id)
    var request1 = await Request.create({
      p_id: patient1._id,
      d_id: docProfile1._id,
      msg: 'I need an eye checkup',
      name: 'John Doe'
    });

    var request2 = await Request.create({
      p_id: patient2._id,
      d_id: docProfile2._id,
      msg: 'Need diabetes consultation',
      name: 'Jane Smith'
    });

    var request3 = await Request.create({
      p_id: patient1._id,
      d_id: docProfile3._id,
      msg: 'I have been experiencing blurred vision recently',
      name: 'John Doe'
    });

    var request4 = await Request.create({
      p_id: patient1._id,
      d_id: docProfile4._id,
      msg: 'Would like a blood pressure review',
      name: 'John Doe'
    });

    var request5 = await Request.create({
      p_id: patient1._id,
      d_id: docProfile5._id,
      msg: 'Need help managing my diabetes',
      name: 'John Doe'
    });

    var request6 = await Request.create({
      p_id: patient2._id,
      d_id: docProfile1._id,
      msg: 'I would like to schedule an eye checkup',
      name: 'Jane Smith'
    });

    var request7 = await Request.create({
      p_id: patient2._id,
      d_id: docProfile3._id,
      msg: 'Need a retina screening',
      name: 'Jane Smith'
    });

    var request8 = await Request.create({
      p_id: patient2._id,
      d_id: docProfile4._id,
      msg: 'Requesting a blood pressure consultation',
      name: 'Jane Smith'
    });

    var request9 = await Request.create({
      p_id: patient1._id,
      d_id: docProfile6._id,
      msg: 'Feeling fatigued, would like a general checkup',
      name: 'John Doe'
    });

    var request10 = await Request.create({
      p_id: patient2._id,
      d_id: docProfile7._id,
      msg: 'Need an eye examination appointment',
      name: 'Jane Smith'
    });

    var request11 = await Request.create({
      p_id: patient3._id,
      d_id: docProfile1._id,
      msg: 'New patient, requesting first checkup',
      name: 'Mike Walker'
    });

    var request12 = await Request.create({
      p_id: patient3._id,
      d_id: docProfile5._id,
      msg: 'Need diabetes screening',
      name: 'Mike Walker'
    });

    var request13 = await Request.create({
      p_id: patient4._id,
      d_id: docProfile1._id,
      msg: 'Need an eye checkup for blurred vision',
      name: 'Sarah Khan'
    });

    var request14 = await Request.create({
      p_id: patient4._id,
      d_id: docProfile2._id,
      msg: 'Need a diabetes consultation',
      name: 'Sarah Khan'
    });

    console.log('Created requests');

    // Create appointments (d_id is the doctor user id so it shows in doctor dashboard)
    var appointment1 = await Appointment.create({
      p_id: patient1._id,
      d_id: doctor1._id,
      date: new Date('2026-08-05'),
      time: '10:00 AM',
      name: 'John Doe'
    });

    var appointment2 = await Appointment.create({
      p_id: patient1._id,
      d_id: doctor2._id,
      date: new Date('2026-08-12'),
      time: '02:30 PM',
      name: 'John Doe'
    });

    var appointment3 = await Appointment.create({
      p_id: patient2._id,
      d_id: doctor2._id,
      date: new Date('2026-08-06'),
      time: '11:00 AM',
      name: 'Jane Smith'
    });

    var appointment4 = await Appointment.create({
      p_id: patient2._id,
      d_id: doctor1._id,
      date: new Date('2026-08-18'),
      time: '03:00 PM',
      name: 'Jane Smith'
    });

    // Today's appointments (2026-08-02) so the doctor dashboard shows TODAY'S SCHEDULE
    var today1 = await Appointment.create({
      p_id: patient1._id,
      d_id: doctor1._id,
      date: new Date('2026-08-02'),
      time: '09:30 AM',
      name: 'John Doe'
    });

    var today2 = await Appointment.create({
      p_id: patient2._id,
      d_id: doctor1._id,
      date: new Date('2026-08-02'),
      time: '11:45 AM',
      name: 'Jane Smith'
    });

    var today3 = await Appointment.create({
      p_id: patient3._id,
      d_id: doctor1._id,
      date: new Date('2026-08-02'),
      time: '02:15 PM',
      name: 'Mike Walker'
    });

    var today4 = await Appointment.create({
      p_id: patient1._id,
      d_id: doctor2._id,
      date: new Date('2026-08-02'),
      time: '10:15 AM',
      name: 'John Doe'
    });

    var today5 = await Appointment.create({
      p_id: patient4._id,
      d_id: doctor1._id,
      date: new Date('2026-08-02'),
      time: '08:45 AM',
      name: 'Sarah Khan'
    });

    var today6 = await Appointment.create({
      p_id: patient1._id,
      d_id: doctor2._id,
      date: new Date('2026-08-02'),
      time: '01:00 PM',
      name: 'John Doe'
    });

    var today7 = await Appointment.create({
      p_id: patient4._id,
      d_id: doctor2._id,
      date: new Date('2026-08-02'),
      time: '04:30 PM',
      name: 'Sarah Khan'
    });

    var today8 = await Appointment.create({
      p_id: patient3._id,
      d_id: doctor2._id,
      date: new Date('2026-08-02'),
      time: '05:45 PM',
      name: 'Mike Walker'
    });

    // Additional upcoming appointments for other doctors
    var appointment5 = await Appointment.create({
      p_id: patient3._id,
      d_id: doctor1._id,
      date: new Date('2026-08-20'),
      time: '10:00 AM',
      name: 'Mike Walker'
    });

    var appointment6 = await Appointment.create({
      p_id: patient1._id,
      d_id: doctor3._id,
      date: new Date('2026-08-07'),
      time: '09:00 AM',
      name: 'John Doe'
    });

    var appointment7 = await Appointment.create({
      p_id: patient2._id,
      d_id: doctor4._id,
      date: new Date('2026-08-11'),
      time: '04:00 PM',
      name: 'Jane Smith'
    });

    var appointment8 = await Appointment.create({
      p_id: patient3._id,
      d_id: doctor5._id,
      date: new Date('2026-08-14'),
      time: '12:00 PM',
      name: 'Mike Walker'
    });

    var appointment9 = await Appointment.create({
      p_id: patient4._id,
      d_id: doctor1._id,
      date: new Date('2026-08-22'),
      time: '11:30 AM',
      name: 'Sarah Khan'
    });

    var appointment10 = await Appointment.create({
      p_id: patient1._id,
      d_id: doctor5._id,
      date: new Date('2026-08-19'),
      time: '02:00 PM',
      name: 'John Doe'
    });

    var appointment11 = await Appointment.create({
      p_id: patient2._id,
      d_id: doctor6._id,
      date: new Date('2026-08-13'),
      time: '10:30 AM',
      name: 'Jane Smith'
    });

    var appointment12 = await Appointment.create({
      p_id: patient3._id,
      d_id: doctor7._id,
      date: new Date('2026-08-15'),
      time: '03:30 PM',
      name: 'Mike Walker'
    });

    var appointment13 = await Appointment.create({
      p_id: patient4._id,
      d_id: doctor3._id,
      date: new Date('2026-08-17'),
      time: '09:15 AM',
      name: 'Sarah Khan'
    });

    console.log('Created appointments');

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

    // Create additional reports for patient1
    await Report.create([
      {
        u_id: patient1._id,
        title: 'Retina Screening - Dec 2025',
        report: { _id: new mongoose.Types.ObjectId(), scan: '1.jpeg', prediction: 1, date: '2025-12-15T10:00:00Z' },
        date: new Date('2025-12-15')
      },
      {
        u_id: patient1._id,
        title: 'Retina Screening - Mar 2026',
        report: { _id: new mongoose.Types.ObjectId(), scan: '4.jpeg', prediction: 0, date: '2026-03-10T09:30:00Z' },
        date: new Date('2026-03-10')
      },
      {
        u_id: patient1._id,
        title: 'Retina Screening - Jun 2026',
        report: { _id: new mongoose.Types.ObjectId(), scan: '7.jpeg', prediction: 1, date: '2026-06-20T14:00:00Z' },
        date: new Date('2026-06-20')
      },
      {
        u_id: patient1._id,
        title: 'Retina Screening - Sep 2025',
        report: { _id: new mongoose.Types.ObjectId(), scan: '3.jpeg', prediction: 0, date: '2025-09-08T10:00:00Z' },
        date: new Date('2025-09-08')
      },
      {
        u_id: patient1._id,
        title: 'Retina Screening - Apr 2025',
        report: { _id: new mongoose.Types.ObjectId(), scan: '6.jpeg', prediction: 1, date: '2025-04-22T14:30:00Z' },
        date: new Date('2025-04-22')
      },
      {
        u_id: patient1._id,
        title: 'Retina Screening - Jan 2025',
        report: { _id: new mongoose.Types.ObjectId(), scan: 'human-eye.webp', prediction: 0, date: '2025-01-12T09:00:00Z' },
        date: new Date('2025-01-12')
      },
      {
        u_id: patient2._id,
        title: 'Retina Screening - Nov 2025',
        report: { _id: new mongoose.Types.ObjectId(), scan: '2.jpeg', prediction: 0, date: '2025-11-05T11:15:00Z' },
        date: new Date('2025-11-05')
      },
      {
        u_id: patient2._id,
        title: 'Retina Screening - Feb 2026',
        report: { _id: new mongoose.Types.ObjectId(), scan: '5.jpeg', prediction: 0, date: '2026-02-18T08:45:00Z' },
        date: new Date('2026-02-18')
      },
      {
        u_id: patient2._id,
        title: 'Retina Screening - May 2026',
        report: { _id: new mongoose.Types.ObjectId(), scan: '8.jpeg', prediction: 1, date: '2026-05-12T16:30:00Z' },
        date: new Date('2026-05-12')
      }
    ]);

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
      { cat_id: cat3._id, title: 'Reduce Sodium Intake', text: 'Limit salt consumption to help maintain healthy blood pressure levels.', addedBy: docProfile2._id },
      { cat_id: cat3._id, title: 'Stay Active', text: 'Engage in regular moderate exercise such as brisk walking to support healthy blood pressure.', addedBy: docProfile2._id }
    ]);

    console.log('Created tip categories and tips');

    console.log('\n--- SEED COMPLETE ---');
    console.log('Login Credentials:');
    console.log('Patient 1 - email: ' + patient1.username + ', password: password123');
    console.log('Patient 2 - email: ' + patient2.username + ', password: password123');
    console.log('Patient 3 (no data) - email: ' + patient3.username + ', password: password123');
    console.log('Patient 4 - email: ' + patient4.username + ', password: password123');
    console.log('Patient 5 (only profile, no data) - email: ' + patient5.username + ', password: password123');
    console.log('Doctor 8 (only profile, no data) - email: ' + doctor8.username + ', password: password123');
    console.log('Doctor 1  - email: ' + doctor1.username + ', password: password123');
    console.log('Doctor 2  - email: ' + doctor2.username + ', password: password123');
    console.log('Doctor 3  - email: ' + doctor3.username + ', password: password123');
    console.log('Doctor 4  - email: ' + doctor4.username + ', password: password123');
    console.log('Doctor 5  - email: ' + doctor5.username + ', password: password123');
    console.log('Doctor 6  - email: ' + doctor6.username + ', password: password123');
    console.log('Doctor 7  - email: ' + doctor7.username + ', password: password123');

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
