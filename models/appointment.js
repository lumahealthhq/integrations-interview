const mongoose = require("mongoose");
const Doctor = require("./doctor");
const Schema = mongoose.Schema;


//Manage all booked appointments
const appointment = new Schema({
  details : {
    doctorId : {
      type :     Number,
      required : true,
    },
    patientId : {
      type :     Number,
      required : true,
    }
  },
  assistant :             {type: [Number], required: false}, // Assists doctors
  start :                 {type: Date, required: true},
  end :                   {type: Date, required: true},
  hour :                  {type: Number, required: false}, // Will be recorded after finished the appointment
  min :                   {type: Number, required: false},
  diagnose :              {type: String, required: false},
  parrent :               {type: String, required: false}, // another case _id
  cancel :                {type: Boolean, required: true}, //false : not cancel, true: canceled
  updatedAt :             {type: Date, required: false},
});

//get all appointments
appointment.statics.getAppointments = function(current) {
  return new Promise((resolve, reject) => {
    let query;
    if(current == 0) {//find history
      query = {start: { $lt: new Date() }};
    }else if(current == 1){//find current appointments & not cancel
      query = {$and: [ {start:{ $gte: new Date()}} ,{cancel: false} ]};
    }else{//find all appointments [default]
      query = {}
    }
      this.find(query).sort({start: -1}).then((appointments) => {
        resolve(appointments);
    })
  });
}

//Get doctor's appointments (patient's id can be specified)
appointment.statics.getDoctorAppointments = function(doctorId, patientId, current) {
  return new Promise((resolve, reject) => {
    let query;
    if(current == 0) {
      query = {start: { $lt: new Date() }};
    }else if(current == 1){
      query = {$and: [ {start:{ $gte: new Date()}} ,{cancel: false} ]};
    }else{
      query = {}
    }
    if(patientId != 0){ // if there is a value of patientId (optional)
      this.find({ $and: [ 
        {'details.doctorId' : doctorId }, 
        {'details.patientId' : patientId },
        query
        ]
      })
      .sort({start: 1}) //Sorting different from all appointments
      .then((appointments) => {
        resolve(appointments);
      })
    }else {
      this.find({ $and: [ 
        {'details.doctorId' : doctorId }, 
        query
        ]
      })
      .sort({start: 1})
      .then((appointments) => {
        resolve(appointments);
      })
    }
  });
}

//Get patient's appointments (doctor's id can be specified)
appointment.statics.getPatientAppointments = function(patientId, doctorId, current) {
  return new Promise((resolve, reject) => {
    let query;
    if(current == 0) {
      query = {start: { $lt: new Date() }};
    }else if(current == 1){
      query = {start: { $gte: new Date() }};
    }else{
      query = {}
    }
    if(doctorId != 0){ //if there is a value of doctorId(optional)
      this.find({ $and: [ 
        {'details.doctorId' : doctorId }, 
        {'details.patientId' : patientId },
        query
        ]
      })
      .sort({start: 1}) //Sorting different from all appointments
      .then((appointments) => {
        resolve(appointments);
      })
    }else {
      this.find({ $and: [ 
        {'details.patientId' : patientId }, 
        query
        ]
      })
      .sort({start: 1})
      .then((appointments) => {
        resolve(appointments);
      })
    }
  });
}

//Check doctor's & patient's free schedule 
//**Since the doctor and patient ids will be chosen from the available list from the UI, assuming that it's not possbile to book a doctor or a patient that doesn't exist
appointment.statics.createAppointment = function(details, assistant, start, minutes, parrent) { 
  return new Promise ((resolve, reject) => {
        let startDate = new Date(start);
        let endDate = new Date(startDate.getTime() + minutes*60000);
        if(startDate < new Date()) reject ("Start date cannot be less than current date"); // check valid date
        else {
          /* Check doctor first
          Check start <= startDate && end >= startDate
          or start <= endDate && end >=endDate
           */
            this.find({ $and: [ { 'details.doctorId' : details.doctorId }, 
              {$or:[ 
                { $and: [ { start: { $lte: startDate } }, { end: { $gte: startDate } } ] }, 
                { $and: [ { start: { $lte: endDate } }, { end: { $gte: endDate } } ] } ]},
                { cancel : false }
              ]
            })
            .then((appointment) => {
            if(appointment == "") { //If the doctor is free, then check patient's
              this.find({ $and: [ { 'details.patientId' : details.patientId }, 
                {$or:[ 
                  { $and: [ { start: { $lte: startDate } }, { end: { $gte: startDate } } ] }, 
                  { $and: [ { start: { $lte: endDate } }, { end: { $gte: endDate } } ] } ]},
                  { cancel : false }
                ]
              })
              .then((appointment) => {
                if(appointment == "") {
                  const newAppointment = new this();
                  newAppointment.details.doctorId = details.doctorId;
                  newAppointment.details.patientId = details.patientId;
                  newAppointment.assistant = assistant;
                  newAppointment.start = startDate;
                  newAppointment.end = endDate;
                  newAppointment.hour = 0;
                  newAppointment.min = 0;
                  newAppointment.diagnose = "";
                  newAppointment.parrent = parrent == "" ? "0" : parrent;
                  newAppointment.cancel = false;
                  newAppointment.updatedAt = new Date().toString();
                  // save the message
                  newAppointment.save()
                  .then((appointment) => {
                    resolve(appointment);
                  })
                }
                else{
                  reject ("Patient's Schedule already booked!");
                }
              });
            }
            else{
              reject ("Doctor's Schedule already booked!");
            }
          });
        }
  });
}

/*
2 purposes
1. Update appointment information
2. Finishing the case (calculate hour, min)
*/
appointment.statics.updateAppointment = function(id, details, assistant, start, minutes, end, diagnose, parrent, cancel) { 
  return new Promise ((resolve, reject) => {
    let startDate = new Date(start);
    if(cancel){ //Cancel case
      this.updateOne({'_id': id }, {$set: { cancel: true}})
      .then((appointment) => {
        resolve(appointment);
      })
    }else if(diagnose != "" && end != ""){//Finishing the case
      let endDate = new Date(end);
      if(endDate >= startDate) { //Check valid date
        //Calculating time different
        let diffTime = endDate - startDate;
        var diff_hours = Math.floor((diffTime % 86400000) / 3600000); // hours
        var diff_mins = Math.round(((diffTime % 86400000) % 3600000) / 60000); // minutes
        this.updateOne({'_id': id }, 
        {$set: { end : endDate,  hour : diff_hours, min: diff_mins, diagnose : diagnose, updatedAt : new Date().toString() } } )
        .then((appointment) => {
          resolve(appointment);
        })
      }else{
        reject ("End date has to be more than start date");
      }
    }else{ //Updating general informationb
        let endDate = new Date(startDate.getTime() + minutes*60000);
        if(startDate < new Date()) reject ("Start date cannot be less than current date"); // check valid date
        else {
          /* Check doctor first
          Check start <= startDate && end >= startDate
          or start <= endDate && end >=endDate
           */
          this.find({ $and: [ { 'details.doctorId' : details.doctorId }, 
            {$or:[ 
              { $and: [ { start: { $lte: startDate } }, { end: { $gte: startDate } } ] }, 
              { $and: [ { start: { $lte: endDate } }, { end: { $gte: endDate } } ] } ]},
              { cancel : false },
              { '_id': { $ne: id } } 
            ]
          })
          .then((appointment) => {
          if(appointment == "") { //If the doctor is free, then check the patient's
            this.find({ $and: [ { 'details.patientId' : details.patientId }, 
              {$or:[ 
                { $and: [ { start: { $lte: startDate } }, { end: { $gte: startDate } } ] }, 
                { $and: [ { start: { $lte: endDate } }, { end: { $gte: endDate } } ] } ]},
                { cancel : false },
                { '_id': { $ne: id } } 
              ]
            })
            .then((appointment) => {
              if(appointment == "") {
                this.updateOne({'_id': id }, 
                  {$set: { 'details.doctorId' : details.doctorId, 'details.patientId' : details.patientId, assistant : assistant, start: startDate , end : endDate, parrent : parrent , updatedAt : new Date().toString() } } )
                  .then((appointment) => {
                    resolve(appointment);
                  })
              }
              else{
                reject ("Patient's Schedule already booked!");
              }
            });
          }
          else{
            reject ("Doctor's Schedule already booked!");
          }
        
        });
      }
    }
  });
}

//Get doctor's total workhour
appointment.statics.getWorkHour = function(doctorId, start, end) {
  return new Promise((resolve, reject) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
      this.find({ $and: [ 
        {'details.doctorId' : doctorId }, 
        { start: { $gte: startDate } },
        { end: { $lte: endDate } },
        { diagnose : { $ne: "" } } //The reason behind checking this is because no matter the case is finished or not, but having a diagnosis can indicate the hour that the doctor has already spent
        ]
      })
      .sort({start: 1})
      .then((appointments) => {
        let totalHour = 0;
        let totalMin = 0;
        for (let i in appointments) {
          //Check hour and min have to be numbers)
          if(!isNaN(appointments[i].hour)) totalHour += appointments[i].hour; 
          if(!isNaN(appointments[i].min)) totalMin += appointments[i].min;
        }
        if(totalMin > 60) totalHour += Math.floor(totalMin/60);
        if(totalMin > 60) totalMin = Math.floor(totalMin%60);
        let result = "Doctor id: "+doctorId+" has been working for "+totalHour+" hours "+totalMin+" mins. From: "+startDate+" to: "+endDate;
        resolve(result);
      })
  });
}

//Get doctor's free schedule, doctorId can be changed to specialities or other possible cases
appointment.statics.findFreeSchedule = function(doctorId, start, end) {
  return new Promise((resolve, reject) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    if(endDate < startDate) reject ("Start date cannot be less than current date"); // check valid date
    else {
      //If the specified startDate less than current, use the current instead
      startDate = startDate >= new Date() ? startDate : new Date();
      //Getting doctor schedult type
      let scheduleType;
      let startTime;
      let endTime;
      return Doctor.getDoctorById(doctorId)
        .then((doctor) => {
          scheduleType = doctor[0].scheduleType;
          //Assuming that there are 2 schedule types
          if(scheduleType == 1){
            startTime = 8;
            endTime = 17;
          }else{
            startTime = 17;
            endTime = 24;
          }
          //Find booked appointments
          this.find({ $and: [ 
            {'details.doctorId' : doctorId }, 
            { start: { $gte: startDate } },
            { end: { $lte: endDate } },
            { cancel : false }
            ]
          })
          .sort({start: 1})
          .then((appointments) => {
            let freeSchedule = [];
            let moreStart = "";
            let j;
            for (let i in appointments) {
          // console.log(scheduleType);
              //Adjusting with booked appointment
              let free = "";
              //Checking start date
              let tempStart = new Date(appointments[i].end);
              tempStart.setMinutes(tempStart.getMinutes()+1);
              let from = startDate <= appointments[i].start ? startDate : tempStart ;
              //Adjusting Start time with the schedule
              if(from.getHours()> endTime) {
                from.setDate(from.getDate()+1);
                from.setHours(startTime)
                from.setMinutes(0);
              }
              let to;
              //Checking end date
              j = parseInt(i)+1;
              if(from > appointments[i].end && j < appointments.length){
                //If start more than endTime already, set end time before the next appointment
                let tempEnd = new Date(appointments[j].start); // Using i+1
                tempEnd.setMinutes(tempEnd.getMinutes()-1);
                to = tempEnd;
              }else{
                if(j >= appointments.length && appointments[i].start > endDate){
                  to = endDate;
                  moreStart = "";
                }else{
                  let tempEnd = new Date(appointments[i].start); // Using i
                  tempEnd.setMinutes(tempEnd.getMinutes()-1);
                  moreStart = appointments[i].end;
                  to = tempEnd;
                }
              }
              //Adjusting End time with the schedule
              if(to.getHours()> endTime) {
                to.setHours(endTime)
                to.setMinutes(0);
              }
              //Create free slots result
              free = j+". Doctor id: "+doctorId+" is free from: "+from+" to: "+to+".";
              freeSchedule.push(free);
              startDate = new Date(appointments[i].end);
            }
            //Adding last slot
            if(moreStart != ""){
              if(moreStart.getHours()> endTime) {
                moreStart.setDate(moreStart.getDate()+1);
                moreStart.setHours(startTime)
                moreStart.setMinutes(0);
              }
              if(endDate.getHours()> endTime) {
                endDate.setHours(endTime)
                endDate.setMinutes(0);
              }
              free = j+". Doctor id: "+doctorId+" is free from: "+moreStart+" to: "+endDate+".";
              freeSchedule.push(free);
            }
            resolve(freeSchedule);
          })
      })
    }
  });
}

const appointmentModel = mongoose.model("appointment", appointment);
module.exports = appointmentModel;

