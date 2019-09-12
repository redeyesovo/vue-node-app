const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RepresentSchema = new Schema({
    representid: {
        type: String,
        required: true
    },
    representname: {
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

module.exports = Represent = mongoose.model('represent', RepresentSchema);