const patient = require('../model/common')('patients');

const create = (req, res) => {
  patient.post(req.body).asCallback((err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something Broke!')
    }
    return res.status(200).json(resp);
  })
}

const get = (req, res) => {
  patient.get(req.query).asCallback((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something Broke!')
    }
    return res.status(200).json(data);
  })
}

const update = (req, res) => {
  patient.put(req.params, req.body).asCallback((err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something Broke!');
    }
    return res.status(200).send('Patient Details Updated')
  })
}

module.exports = {
  create,
  get,
  update
}