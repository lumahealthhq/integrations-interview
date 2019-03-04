const patient = require('../model/common')('doctor');

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
    } else if (data.length == 0) {
      return res.status(404).send('Not Found!')
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

const del = (req, res) => {
  patient.destroy(req.params).asCallback((err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong!');
    }
    return res.status(200).send(`Patient Deleted`);
  })
}

module.exports = {
  create,
  get,
  update,
  del
}