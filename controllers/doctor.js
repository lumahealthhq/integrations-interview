const doctor = require('../model/common')('doctor');

const create = (req, res) => {
  doctor.post(req.body).asCallback((err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something Broke!')
    }
    return res.status(200).json(resp);
  })
}

const get = (req, res) => {
  doctor.get(req.query).asCallback((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something Broke!')
    } else if (data.length == 0) {
      console.log(data);
      return res.status(404).send('Not Found!')
    }
    return res.status(200).json(data);
  })
}

const update = (req, res) => {
  doctor.put(req.params, req.body).asCallback((err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something Broke!');
    }
    return res.status(200).send('Doctor Details Updated')
  })
}

const del = (req, res) => {
  doctor.destroy(req.params).asCallback((err, resp) => {
    console.log(err, resp);
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong!');
    }
    return res.status(200).send(`Doctor Deleted`);
  })
}

module.exports = {
  create,
  get,
  update,
  del
}