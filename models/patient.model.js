const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Opening = require('./opening.model');
const OpeningSchema = mongoose.model('Opening').schema;

let PatientSchema = new Schema({
  name: {type: String, required: true, max: 100},
  appointments: [OpeningSchema]
});

// export the model
module.exports = mongoose.model('Patient', PatientSchema);