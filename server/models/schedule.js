const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const scheduleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  doc_id: {
    type: String
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  
  timings: {
    "Monday":[],
    "Tuesday":[],
    "Wednesday":[],
    "Thursday":[],
    "Friday":[],
    "Saturday":[],
    "Sunday":[],
  },
});
var schedule=mongoose.model('Schedule', scheduleSchema);
module.exports=schedule;