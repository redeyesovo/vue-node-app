const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlatSchema = new Schema({
    platid: {
        type: String,
        required: true
    },
    platname: {
        type: String,
        required: true
    },
    description: {
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

module.exports = Plat = mongoose.model('plat', PlatSchema);