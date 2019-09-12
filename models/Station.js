const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StationSchema = new Schema({
    stationid: {
        type: String,
        required: true
    },
    stationname: {
        type: String,
        required: true
    },
    platid: {
        type: String,
    },
    platname: {
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

module.exports = Station = mongoose.model('station', StationSchema);