doctor = require('./controllers/doctor');
patient = require('./controllers/patient');
schedule = require('./controllers/schedule');

appointment = require('./controllers/appointment');

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
  
  app.post('/schedule', schedule.create)
  app.get('/schedule', schedule.get)
  app.post('/schedule/:id', schedule.update)
  app.delete('/schedule/:id', schedule.del)

  app.post('/appointment', appointment.create)
  app.get('/appointment', appointment.get)
  app.post('/appointment/:id', appointment.update)
  app.delete('/appointment/:id', appointment.del)

}

module.exports = {
  route
}