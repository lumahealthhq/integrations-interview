const appointment = require('../model/common')('appointments');
const schedule = require('../model/common')('schedule');

const async = require('async');

const ERROR = {
  NF: 'Not Found',
  AB: 'Slot is already booked!'
}

const isOpen = (store, next) => {
  schedule.get({ id: store.schedule_id }).asCallback((err, data) => {
    if (err) { 
      return next(err);
    } else if (data.length == 0) {
      return next(ERROR.NF);
    } else {
      return next(null, data[0].status, store)
    }
  });
}

const confirmAppointment = (open, store, next) => {
  if (!open) {
    appointment.post(store).asCallback((err, resp) => {
      if (err) { return next(err); }
      return next(null, store.schedule_id, 1);
    })
  } else {
    return next(ERROR.AB) 
  }
}

const updateScheduleStatus = (id, status, next) => {
  where = { id: id };
  what = { status: status };
  schedule.put(where, what).asCallback((err, resp) => {
    if (err) { return next(err); } 
    return next(null, resp);  
  })
}

const create = (req, res) => {
  if (!req.body || !req.body.patient_id || !req.body.schedule_id) {
    res.status(400).send('Make sure you are sending patient_id and schedule_id')
  }

  store = {
    patient_id: parseInt(req.body.patient_id),
    schedule_id: parseInt(req.body.schedule_id)
  }

  async.waterfall([
    isOpen.bind(null, store),
    confirmAppointment,
    updateScheduleStatus
  ], (err, result) => {
      if (err) {
        console.log(err);
        if (err == ERROR.NF) { return res.status(404).send(ERROR.NF); } 
        if (err == ERROR.AB) { return res.status(200).send(ERROR.AB); }
        return res.status(500).send(err);
      }
      return res.status(200).send('Appointment Booked');
    }
  )
}

const get = (req, res) => {
  appointment.get(req.query).asCallback((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err)
    } else if (data.length == 0) {
      return res.status(404).send('Not Found!')
    }
    return res.status(200).json(data);
  })
}

const update = (req, res) => {
  appointment.put(req.params, req.body).asCallback((err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send('Appointment Details Updated')
  })
}

const getScheduleId = (appointment_id, next) => {
  appointment.get({ id: appointment_id }).asCallback((err, data) => {
    if (err) { return next(err); } 
    console.log(data);
    store = {
      appointment_id,
      schedule_id: data[0].schedule_id,
    }
    return next(null, store);
  })
}

const deleteAppointment = (store, next) => {
  appointment.destroy({ id: store.appointment_id }).asCallback((err, resp) => {
    if (err) { return next() }
    return next(null, store.schedule_id, 0);
  })
} 

const del = (req, res) => {
  async.waterfall([
    getScheduleId.bind(null, parseInt(req.params.id)),
    deleteAppointment,
    updateScheduleStatus
  ], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send('Appointment Deleted!');
  })
  
}

module.exports = {
  create,
  get,
  update,
  del
}