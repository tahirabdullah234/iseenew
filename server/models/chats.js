var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Chats = new Schema({
    p_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    d_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Chats', Chats);