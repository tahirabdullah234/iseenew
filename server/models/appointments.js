var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Appointment = new Schema({
    p_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    d_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor'
    },
    apt_date: {
        type: String,
    },
    time: {
        type: String
    },
    name: {
        type: String
    }
});

module.exports = mongoose.model('Appointment', Appointment);