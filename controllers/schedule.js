const schedule = require('../model/common')('schedule');
const moment = require('moment');
const async = require('async');

const STATUS = {
  open: 0,
  booked: 1
}

const addSchedule = (data, callback) => {
  schedule.post(data).asCallback(callback);
}

const create = (req, res) => {
  if (!req.body || !req.body.doctor_id || !req.body.date || !req.body.slots || !req.body.duration) {
    res.status(400).send('Missing Parameters, Make sure you are sending doctor_id, date, number of slots, and duration of slots')
  }

  // Sanitize the data as needed
  let store = {
    doctor_id: parseInt(req.body.doctor_id),
    date: moment(req.body.date).format('YYYY-MM-DD HH:mm:ss'),
    slots: parseInt(req.body.slots),
    duration: parseInt(req.body.duration),
  }

  // Create all the tasks
  tasks = [];
  for (let i = 0; i < store.slots; i++) {
    let endtime = moment(store.date).add(store.duration, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    tasks.push(addSchedule.bind(null, {
        doctor_id: store.doctor_id,
        from: store.date,
        to: endtime,
        status: STATUS.open
      }
    ));
    store.date = endtime;
  }

  // Run in parallel
  async.parallel(tasks, (err, cb) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send('Schedule Updated!');
  });
}

const get = (req, res) => {
  schedule.get(req.query).asCallback((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err)
    } else if (data.length == 0) {
      console.log(data);
      return res.status(404).send('Not Found!')
    }
    return res.status(200).json(data);
  })
}

const update = (req, res) => {
  schedule.put(req.params, req.body).asCallback((err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send('Schedule Details Updated')
  })
}

const del = (req, res) => {
  schedule.destroy(req.params).asCallback((err, resp) => {
    console.log(err, resp);
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(`Schedule Deleted`);
  })
}

module.exports = {
  create,
  get,
  update,
  del
}