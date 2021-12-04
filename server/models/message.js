var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
    p_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    d_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor'
    },
    data: {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Message', Message);