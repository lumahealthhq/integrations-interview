doctor = require('./controllers/common')('doctors');
patient = require('./controllers/common')('patients');

const route = (app) => { 
  app.get('/', (req, res) => {
    res.send('App is running!');
  });
  
  app.post('/doctor', doctor.create)
  app.get('/doctor', doctor.get)
  app.post('/doctor/:id', doctor.update)
  app.delete('/doctor/:id', doctor.del)

  app.post('/patient', patient.create)
  app.get('/patient', patient.get)
  app.post('/patient/:id', patient.update)
  app.delete('/patient/:id', patient.del)
}

module.exports = {
  route
}