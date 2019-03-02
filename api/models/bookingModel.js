const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    docid: String,
    patientId : String,
    date: Date,
    startTime: Date,
    endTime: Date
});

module.exports = mongoose.model('Booking', bookingSchema);
