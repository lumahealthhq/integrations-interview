module.exports = (table) => {
  db = require('../model/common')(table)
  let module = {}

  module.create = (req, res) => {
    db.post(req.body).asCallback((err, resp) => {
      if (err) {
        console.log(err);
        res.status(500).send('Something Broke!')
      } else {
        res.status(200).json(resp);
      }
    })
  }

  module.get = (req, res) => {
    db.get(req.params).asCallback((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Something Broke!')
      } else if (data.length == 0) {
        res.status(404).send('Not Found!')
      } else {
        res.status(200).json(data);
      }
    })
  }

  module.update = (req, res) => {
    db.put(req.params, req.body).asCallback((err, resp) => {
      if (err) {
        console.log(err);
        res.status(500).send('Something Broke!');
      } else {
        res.status(200).send(`${table} updated`)
      }
    })
  }

  module.del = (req, res) => {
    db.destroy(req.params).asCallback((err, resp) => {
      console.log(err, resp);
      if (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      } else {
        res.status(200).send(`${table} Deleted`);
      }
    })
  }
  return module
}
