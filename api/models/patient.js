'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var patientSchema = new Schema({
  name: {
    type: String,
    required: 'Please specify a value for name field'
  }
});

var Patients = mongoose.model('Patients', patientSchema);

module.exports = Patients;
