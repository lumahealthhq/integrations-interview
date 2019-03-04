const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AppointmentSchema = new Schema({
    doctor: {type: String, required: true, max: 100},
    start: {type: String, required: true},
    end: {type: String, required: true},
    day: {type: String, required: true}
});

module.exports = mongoose.model('Appointment', AppointmentSchema);