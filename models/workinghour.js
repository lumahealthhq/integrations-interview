let mongoose = require('mongoose');

let workinghourSchema = new mongoose.Schema({
    doctorId: String,
    date: Date,
    duration: String,
    status: String
});

module.exports = mongoose.model('Workinghour', workinghourSchema);