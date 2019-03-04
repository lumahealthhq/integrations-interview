'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var doctorSchema = new Schema({
  name: {
    type: String,
    required: 'Please specify a value for name field',
    unique: true
  },
  workingHours: [
    {
      date: Date,
      startTime: Number,
      endTime: Number
    }
  ]
});

var Doctors = mongoose.model('Doctors', doctorSchema);

module.exports = Doctors;
