'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
  patientId: {
    type: String,
    required: 'Please specify a value for patient id field'
  },
  docId: {
    type: String,
    required: 'Please specify a value for doctor id field'
  },
  date: {
    type: Date,
    required: 'Please specify a date for your appointment'
  },
  startTime: {
    type: Number,
    required: 'Please specify a start time for the appointment'
  },
  endTime: {
    type: Number,
    required: 'Please specify an end time for the appointment'
  }
});

var Appointments = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointments;
