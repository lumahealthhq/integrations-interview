let mongoose = require('mongoose');

let doctorSchema = new mongoose.Schema({
    doctorId: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('Doctor', doctorSchema);