const mongoose = require("mongoose");
var Booking = require('../models/booking');
var Schedule = require('../models/schedule');
var Patient = require('../models/patient');

// get the list of bookings
var getAllBookings = function(req, res) {
  Booking.find({}, function(err, docs) {
  if (err) 
    res.send({"ErrorCode":1,"Message":err});
  else
    res.send({"ErrorCode":0,"List of bookings ":docs});
  });
}
// create new booking
var createBooking = function(req, res) {
  // Create an instance of model SomeModel
  var timing = {"day": req.body.day, "slot":req.body.slot};
  var booking = Booking({
      _id: mongoose.Types.ObjectId(),
      doc_id:req.body.doc_id,
      pat_id:req.body.pat_id,
      timings:timing,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

  Patient.find({"_id":req.body._id},function(errorPat, patient){
    if(errorPat || patient.length==0)
      res.send({"ErrorCode":1,"Message":"Patient not found"});
    else{
        Schedule.find({"doc_id":req.body.doc_id},function(err, doctor) {
        if (err)
          res.send({"ErrorCode":1,"Message":err});
        else if(doctor.length>0 && doctor[0].timings[req.body.day.toString()] && doctor[0].timings[req.body.day.toString()].length>0 ){
          var flag=0;
          for (let item of doctor[0].timings[req.body.day]) {
            if(item["slot"]==req.body.slot && item["noOfPatients"]>0 && item["availability"]=="Y"){
              flag=1;
              item["noOfPatients"]--;
              if(item["noOfPatients"]==0)
                item["availability"]="N";
            }
          }
          if(flag==1){
              Schedule.update({"doc_id":req.body.doc_id},{$set:{timings:doctor[0].timings}},function(error,updateDoc){
              if(error)
                res.send({"ErrorCode":1,"Message":"Mongo update error"});
              else{

                  booking.save(function (err) {
                    if (err) 
                      res.send({"ErrorCode":1,"Message":"Patient cannot take more than one appointment with the same doctor"});
                    else
                      res.send({"ErrorCode":0,"Message":"Booking created"});
                   });
              }
                 
            });
          }
          else
            res.send({"ErrorCode":1,"Message":"Doctor not available at this time"}); 
          }
        else{
          res.send({"ErrorCode":1,"Message":"Doctor not found or doctor not available at this time"});
        }
      });
    } 
 }); 
}

// find Booking by patient's id, doctor's id or by day
var findBookingByField = function(req, res) {
  if(req.body.pat_id!="" && req.body.pat_id ){
    Booking.find({ "pat_id": req.body.pat_id}, function(err, docs) {
     if (err)
      res.send({"ErrorCode":1,"Message":err});
    else           
      res.send({"ErrorCode":0,"Message":docs});
    });
  }
  else if(req.body.doc_id!="" && req.body.doc_id ){
    Booking.find({ "doc_id": req.body.doc_id}, function(err, docs) {
     if (err)
      res.send({"ErrorCode":1,"Message":err});
    else           
      res.send({"ErrorCode":0,"Message":docs});
    });
  }
  else if(req.body.day!="" && req.body.day ){
    Booking.find({ "day": req.body.day}, function(err, docs) {
    if (err)
      res.send({"ErrorCode":1,"Message":err});
    else           
      res.send({"ErrorCode":0,"Message":docs});
    });
  }
}



// delete all the bookings
var deleteAll =function(req, res){
  Booking.remove({}, function(err) {
    if (err)
      res.send({"ErrorCode":1,"Message":err});
    else           
      res.send({"ErrorCode":0,"Message":"All bookings deleted successfully"});
  });
}

module.exports = {getAllBookings,createBooking,findBookingByField, deleteAll};