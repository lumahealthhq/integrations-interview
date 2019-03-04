const doctor = require('../model/common')('doctors');

const create = (req, res) => {
  doctor.post(req.body).asCallback((err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err)
    }
    return res.status(200).json(resp);
  })
}

const get = (req, res) => {
  doctor.get(req.query).asCallback((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err)
    }
    return res.status(200).json(data);
  })
}

const update = (req, res) => {
  doctor.put(req.params, req.body).asCallback((err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send('Doctor Details Updated')
  })
}

module.exports = {
  create,
  get,
  update,
}