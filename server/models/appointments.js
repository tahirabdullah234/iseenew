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
    date: {
        type: Date,
    },
    time: {
        type: String
    },
    name: {
        type: String
    }
});

module.exports = mongoose.model('Appointment', Appointment);