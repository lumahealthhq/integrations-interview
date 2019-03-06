const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const bookingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  doc_id: {
    type: String
  },
  pat_id: {
    type: String
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  timings: [
  {
	  day: String,
	  slot: String
	}
  ],
});
bookingSchema.index({ doc_id: 1, pat_id: 1}, { unique: true });
var booking=mongoose.model('Booking', bookingSchema);
module.exports=booking;