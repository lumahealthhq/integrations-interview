const commonHandler = (promise, req, res) => {
  promise.then(({statusCode, result}) => {
    res.status(statusCode).json(result)
  })
    .catch((err) => {
      res.status(500).send(err);
    })
}

module.exports = commonHandler;