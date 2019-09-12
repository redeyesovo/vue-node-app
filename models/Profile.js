const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    othername: {
        type: String,
        required: true
    },
    ifuseful: {
        type: String,
    },
    description: {
        type: String
    },
    character: {
        type: String,
    },
    creater: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);