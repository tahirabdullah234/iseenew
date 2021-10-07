var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dataset = new Schema({
    u_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    scan: {
        type: String
    },
    prediction: {
        type: Number
    },
    probability: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Dataset', Dataset);