const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InrecordSchema = new Schema({
    streamid: {
        type: String,
        required: true
    },
    streamtime: {
        type: String,
        required: true
    },
    medianame: {
        type: String,
    },
    representname: {
        type: String,
    },
    money: {
        type: String,
    },
    description: {
        type: String,
    },
    operator: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Inrecord = mongoose.model('inrecord', InrecordSchema);