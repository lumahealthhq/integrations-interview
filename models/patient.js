let mongoose = require('mongoose');

let patientSchema = new mongoose.Schema({
    patientId: Number,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('Patient', patientSchema);
