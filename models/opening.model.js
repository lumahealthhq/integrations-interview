const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OpeningSchema = new Schema({
  doctor_name: {type: String, required: true, max: 100},
  date: {type: String, required: true, max: 100}
});

// export the model
module.exports = mongoose.model('Opening', OpeningSchema);