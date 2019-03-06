const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const doctorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  clinic_name:{
  	type:String
  },
  address:{
  	type:String
  },
  qualification:{
  	type:String
  },
  contact:{
  	type:String
  },
  rating:{
  	type:Number
  },
  specialistion: {
    type: String
  },
});
var doctor=mongoose.model('Doctor', doctorSchema);
module.exports=doctor;