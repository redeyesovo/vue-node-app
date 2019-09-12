const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OASchema = new Schema({
    oaid: {
        type: String,
        required: true
    },
    oaname: {
        type: String,
        required: true
    },
    stationname: {
        type: String,
    },
    platname: {
        type: String,
    },
    source: {
        type: String,
    },
    runer: {
        type: String,
    },
    sex: {
        type: String,
    },
    company: {
        type: String,
    },
    state: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = OA = mongoose.model('oa', OASchema);