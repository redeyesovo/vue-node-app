const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MediaSchema = new Schema({
    mediaid: {
        type: String,
        required: true
    },
    medianame: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Media = mongoose.model('media', MediaSchema);