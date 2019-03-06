const mongoose = require("mongoose");
var Doctor = require('../models/doctor');
var Schedule = require('../models/schedule');


// get the list of doctors
var getAllDoctors = function(req, res) {
  Doctor.find({}, function(err, docs) {
  if (err) 
    res.send({"ErrorCode":1,"Message":err});
  else
    res.send({"ErrorCode":0,"List of doctors ":docs});
  });
}
// create new doctor
var createDoctor = function(req, res) {

  /*** optional fields
  var clinic_name, qualification, rating, address, contact;
  var id = mongoose.Types.ObjectId();
  if(req.body.clinic_name && req.body.clinic_name!="")
    clinic_name=req.body.clinic_name;
  if(req.body.qualification && req.body.qualification!="")
    qualification=req.body.qualification;
  if(req.body.rating && req.body.rating!="")
    rating=parseFloat(req.body.rating);
  if(req.body.address && req.body.address!="")
    address=req.body.address;
  if(req.body.contact && req.body.contact!="")
    contact=req.body.contact;
  *****/

/*** A sample body which should come from frontend as a json object to be inserted into database collection doctor -.

{
"name":"Mr Z",
"specialisation":"ENT",
"timings":
{"Monday":[{"slot":"13-14","noOfPatients":3,"availability":"Y"},
{"slot":"18-19","noOfPatients":"3","availability":"Y"}],
"Tuesday":[{"slot":"17-15","noOfPatients":3,"availability":"Y"},
{"slot":"13-14","noOfPatients":2,"availability":"Y"},
{"slot":"11-12","noOfPatients":3,"availability":"Y"}]
}
}

***/
// Create an instance of doctor model
var id = mongoose.Types.ObjectId();
    var doctor = Doctor({
      _id:id,
      name: req.body.name,
      specialisation: req.body.specialisation,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
   
  // Save the new model instance, passing a callback
    doctor.save(function (err) {
      if (err) 
        res.send({"ErrorCode":1,"Message":err});
      // Create an instance of schedule model
      var schedule = Schedule({
        _id:mongoose.Types.ObjectId(),
        doc_id: id,
        timings: req.body.timings,
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      // Save the new model instance, passing a callback
      schedule.save(function (err) {
        if (err) 
          res.send({"ErrorCode":1,"Message":err});
        else
          res.send({"ErrorCode":0,"Message":"Doctor created"});
        });
    });
}
// find Doctor by doctor's Name, specialistion or by id
var findDoctorByField = function(req, res) {
  if(req.body.name!="" && req.body.name ){
    Doctor.find({ "name": req.body.name}, function(err, docs) {
      if (err)
        res.send({"ErrorCode":1,"Message":err});
      else           
        res.send({"ErrorCode":0,"Message":docs});
    
    });
  }
  else if(req.body.specialistion!="" && req.body.specialistion ){
    Doctor.find({ "specialistion": req.body.specialistion}, function(err, docs) {
      if (err)
        res.send({"ErrorCode":1,"Message":err});
      else           
        res.send({"ErrorCode":0,"Message":docs});
    });
  }
  else if(req.body.id!="" && req.body.id ){
    Doctor.find({ "_id": req.body.id}, function(err, docs) {
      if (err)
        res.send({"ErrorCode":1,"Message":err});
      else           
        res.send({"ErrorCode":0,"Message":docs});
    });
  }
    
}

//find Schedule of a doctor by its id
var findWorkingHoursOfDoc= function(req, res) {
  if(req.body.id!="" && req.body.id ){
    Schedule.find({ "doc_id": req.body.id}, function(err, docs) {
    if (err)
      res.send({"ErrorCode":1,"Message":"Mongo find error"});
    else if(docs.length > 0)
      res.send({"ErrorCode":0,"Working Hours":docs[0].timings});
    else
      res.send({"ErrorCode":1,"Message":"Doctor id not found"});
    });
  }
  else{
      res.send({"ErrorCode":1,"Message":"please provide the appropriate id"});
  }
}

//update the Schedule of a doctor by its id
var updateWorkingHoursOfDoc= function(req, res) {
  if(req.body.id!="" && req.body.id  && req.body.day!="" && req.body.day){
    Schedule.find({ "doc_id": req.body.id}, function(err, docs) {
    if (err)
      res.send({"ErrorCode":1,"Message":"Mongo find error"});
    else if(docs.length > 0){
      // if doctor hasn't specified the noOfPatients that he/she will attend in each slot will be 3 and availability will be Yes
        var newSlot = {"slot":"","noOfPatients":3,"availability":"Y"}  
        if(req.body.slot && req.body.slot!="")
          newSlot["slot"]=req.body.slot;
        if(req.body.noOfPatients)
          newSlot["noOfPatients"]=parseInt(req.body.noOfPatients);
        if(req.body.availability=="Y" || req.body.availability=="N")
          newSlot["availability"]=req.body.availability;
      if(!docs[0].timings[req.body.day]){
          docs[0].timings[req.body.day]=[];
          // new slot is getting inserted
          docs[0].timings[req.body.day].push(newSlot);

      }
      else if(docs[0].timings[req.body.day]){
        var flag=0;
        for (let item of docs[0].timings[req.body.day]) {
          if(item["slot"]==req.body.slot){
            flag=1;
            if(req.body.noOfPatients)
              item["noOfPatients"]=parseInt(req.body.noOfPatients);
            if(req.body.availability=="Y" || req.body.availability=="N")
              item["availability"]=req.body.availability;
          }
        }
         if(flag==0){
          // new slot is getting inserted
          docs[0].timings[req.body.day].push(newSlot);
        }
      }
     
      docs[0].updated_at=Date.now();
      Schedule.update({"doc_id":req.body.id},{$set:{timings:docs[0].timings,updated_at:docs[0].updated_at}},function(error,updateDoc){
          if(error)
            res.send({"ErrorCode":1,"Message":"Mongo update error"});
          else
            res.send({"ErrorCode":0,"Message":"Updated Successfully"});
      });
    }
    else
      res.send({"ErrorCode":1,"Message":"Doctor id not found"});
    });
  }
  else{
    res.send({"ErrorCode":1,"Message":"please provide the appropriate id and day"});
  }
}

// delete all the doctors
var deleteAll =function(req, res){
  Doctor.remove({}, function(err) {
    if (err)
      res.send({"ErrorCode":1,"Message":err})
    else           
      res.send({"ErrorCode":0,"Message":"All doctors deleted successfully"});
  });
}

module.exports = {getAllDoctors,createDoctor,findDoctorByField, deleteAll, findWorkingHoursOfDoc, updateWorkingHoursOfDoc};