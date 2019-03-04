let mongoose = require('mongoose');

let appointmentSchema = new mongoose.Schema({
    patientId: String,
    doctorId: String,
    duration: String,
    date: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);