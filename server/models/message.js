var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
    p_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    d_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    msg: {
        type: String
    },
    patient: {
        type: Boolean
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', Message);