const Doctor = require('../models').Doctor;
const Appointment = require('../models').Appointment;
const Availability = require('../models').DoctorAvailability;

module.exports = {
  create(req, res) 
  {
    return Doctor
      .create({
        doctor_firstname: req.body['fname'],
        doctor_lastname: req.body['lname'],
        doctor_email: req.body['email']
      })
      .then(doctor => res.status(201).send(doctor))
      .catch(error => res.status(400).send(error));
  },
  getAllDoctors(req, res) 
  {
    return Doctor
      .findAll()
      .then(doctors => res.status(200).send(doctors))
      .catch(error => res.status(400).send(error));
  },
  getDoctor(req, res) 
  {
    return Doctor
      .findAll({
        where: {
          id: req.params.id,
        }
      })
      .then(doctor => res.status(200).send(doctor))
      .catch(error => res.status(400).send(error));
  },
  getAppointments(req, res) 
  {
    return Appointment
      .findAll({
        where: {
          doctor_id: req.params.id,
        }
      })
      .then(appts => res.status(200).send(appts))
      .catch(error => res.status(400).send(error));
  },
  createAvailability(req, res) 
  {
    Availability.findAll({
      where: {
        doctor_id: req.body.id,
        avail_date: req.body.date,
        start_time: req.body.stime        
      }
    })
    // check if there any exising records for the doc
    .then(dAvailability => {
      console.log("%o", dAvailability);
      if(dAvailability.length == 0)
      {
        return Availability
        .create ({
          doctor_id: req.body.id,
          avail_date: req.body.date,
          start_time: req.body.stime,
          end_time: req.body.etime
        })
        .then(avail => res.status(201).send("Schedule created successfully"))
        .catch(error => res.status(400).send(error));
      }
      else
      {
        res.status(400).send("Schedule already exists");
      }
    })
  },
  createAvailabilities(req, res) 
  {
    let aList = req.body;
    console.log("%o", aList);
    let isConflict = false;    
    
    for (var i = 0; i < aList.length; i++)
      {
        let availability = aList[i];        
        // query availability to check if there are any existing slots
        Availability.findAll({
          where: {
            doctor_id: availability.id,
            avail_date: availability.date,
            start_time: availability.stime        
          }
        })
        .then(dAvailability => {
          if(dAvailability.length == 0)
          {
            Availability.create ({
              doctor_id: availability.id,
              avail_date: availability.date,
              start_time: availability.stime,
              end_time: availability.etime
            })
          }
        })
      }
    res.status(201).send("Schedule created successfully");        
  },
  updateAvailability(req,res)
  {
    console.log("%o", req.body)    
    return Availability
    .update({
      start_time: req.body.stime,
      end_time: req.body.etime
      }, 
      { where: 
        {
          doctor_id: req.body.id,
          avail_date: req.body.date
        }
    })
    .then(updateAvailability => res.status(202).send(updateAvailability))
    .catch(error => res.status(400).send(error));
  },
  getWorkingHours(req,res)
  {
    return Availability
    .findAll({
      where: {
        doctor_id: req.params.id,
        avail_date: req.params.date
      }
    })
    .then(availability => {
      res.status(200).send(availability)
    })
    .catch(error => res.status(400).send(error));
  },
  getAllWorkingHours(req, res) 
  {
    return Availability
    .findAll({
      where: {
        doctor_id: req.params.id,
      }
    })
    .then(appts => res.status(200).send(appts))
    .catch(error => res.status(400).send(error));
  },
  getDoctorsWorkingHours(req, res) 
  {
    return Availability
    .findAll()
    .then(appts => res.status(200).send(appts))
    .catch(error => res.status(400).send(error));
  }
};