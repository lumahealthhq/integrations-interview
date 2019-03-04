'use strict';

var mongoose = require('mongoose'),
  Appointments = mongoose.model('Appointments'),
  Doctors = mongoose.model('Doctors');

exports.list_all_appointments = (req, res) => {
  if(req.query.docId && req.query.date) {
    findAllAppointmentsByDocIdAndDate(req.query.docId, req.query.date, (err, appointments) => {
      if(err)
        res.status(500).send({message:"Unable to retrieve apointment information", error: err});
      else {
        appointments.length>0 ? res.status(200).send(appointments) : res.status(204).send();
      }
    });
  } else if(req.query.docId) {
    findAllAppointmentsByDocId(req.query.docId, (err, appointments) => {
      if(err)
        res.status(500).send({message:"Unable to retrieve apointment information", error: err});
      else {
        appointments.length>0 ? res.status(200).send(appointments) : res.status(204).send();
      }
    });
  } else {
    res.status(400).send({message:"docId and date are missing in query params"});
  }
};

exports.add_a_appointment = (req, res) => {
  var new_appointment = new Appointments(req.body);
  validateAppointment(new_appointment, (validAppointment, message) => {
    if(validAppointment) {
      new_appointment.save( (err, appointment) => {
        err ? res.status(500).send({message:"Unable to add an appointment", error:err}) : res.status(201).json(appointment);
      });
    }else {
      res.status(400).send({message:message});
    }
  });
};


exports.get_a_appointment = (req, res) => {
  Appointments.findOne({_id:req.params.appointmentId}, (err, appointment) => {
    err ? res.status(500).send({message:"Unable to retrieve appointment information", error: err}) : res.status(200).json(appointment);
  });
};


exports.update_a_appointment = (req, res) => {
  Appointments.findById({_id:req.params.appointmentId}, (err, existingAppointment) =>{
    if (err){
      res.status(500).send({
        message:"Unexpected error occured",
        error: err
      });
    } else if(existingAppointment) {
      var new_appointment = new Appointments(req.body);
      validateAppointment(new_appointment, (validAppointment, message) => {
        if(validAppointment) {
          new_appointment.save((err, appointment_new) => {
            if (err){
              res.status(500).send({
                message:"Unable to update original appointment",
                error: err
              });
            } else {
              Appointments.remove({
                _id: req.params.appointmentId
              }, (err, appointment) => {
                if (err) {
                  res.status(500).json({
                    message:"New appointment created but unable to cancel old appointment",
                    error: err,
                    new_appointment: appointment_new
                  });
                } else {
                  res.status(200).json({ message: 'Appointment successfully updated' });
                }
              });
            }
          });
        } else {
          res.status(400).json({message:message})
        }
      });
    } else {
      res.status(400).json({
        message:"Cannot find original appointment",
      });
    }
  });
}


exports.delete_a_appointment = (req, res) => {
  Appointments.remove({
    _id: req.params.appointmentId
  }, (err, appointment) => {
    err ? res.status(500).send(err) : res.json({ message: 'Appointment successfully deleted' });
  });
};

function findAllAppointmentsByDocIdAndDate(docId, date, appointmentsResult) {
  Appointments.find({
    $and:[{docId: docId}, {date: new Date(date)}]
  }, appointmentsResult);
}

function findAllAppointmentsByDocId(docId, appointmentsResult) {
  Appointments.find({docId: docId}, appointmentsResult);
}

function validateAppointment(appointment, validationResult) {
  Doctors.findById(appointment.docId, (err, doctor) => {
    if(err){
      validationResult(false, "Error retrieving appointment information");
    }
    if(doctor) {
      var workingDay = doctor.workingHours.find((workingDay) => {
        return Number(workingDay.date) === Number(appointment.date);
      });
      if(workingDay && workingDay.startTime <= appointment.startTime &&
        workingDay.endTime >= appointment.endTime){
        checkIfTimeSlotAvailable(appointment, validationResult);
      }else {
        validationResult(false, "Invalid appointment time. Check Doctor's working hours");
      }
    } else {
      validationResult(false, "No doctor found with this id");
    }
  });
}

function checkIfTimeSlotAvailable(appointment, validationResult) {
  Appointments.find(
    {
      $and:[ { docId: appointment.docId },
             {date: appointment.date},
             {
               $or: [
                 {
                    $and: [
                      {startTime: {$lt: appointment.startTime}},
                      {endTime: {$gt: appointment.startTime}}
                    ]
                  },
                  {
                    $and: [
                      {startTime: {$lt: appointment.endTime}},
                      {endTime: {$gt: appointment.endTime}}
                    ]
                  },
                  {
                    $and: [
                      {startTime: {$eq: appointment.startTime}},
                      {endTime: {$lte: appointment.endTime}}
                    ]
                  }
               ]
             }
           ]
    }, (err, bookedAppointment) => {
      console.log("bookedAppointment: "+bookedAppointment);
        if(bookedAppointment.length>0){
          validationResult(false, "Appointment time conflicts with an existing appointment");
        } else {
          validationResult(true, "Validation successful");
        }
  });
}
