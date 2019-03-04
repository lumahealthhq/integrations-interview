class appointmentController {

  static get appointmentModel () {
    return global.AppointmentModel
  }

  static addAppointment(details, assistant, start, minutes, parrent) {
    return this.appointmentModel.createAppointment(details, assistant, start, minutes, parrent)
    .then((appointment) => ({statusCode: 201, result: {objectId: appointment._id, doctor : appointment.details.doctorId, patient: appointment.details.patientId, appointmentDate: appointment.start }}))
      .catch((err) => {
        console.log(err)
        if(err.statusCode) {
          return Promise.resolve({statusCode: err.statusCode, result: err.result})
        } else {
          return Promise.resolve({statusCode: 400, result: err})
        }
      });
  }

  static updateAppointment(id, details, assistant, start, minutes, end, diagnose, parrent, cancel) {
    return this.appointmentModel.updateAppointment(id, details, assistant, start, minutes, end, diagnose, parrent, cancel)
    .then((appointment) => ({statusCode: 201, result: {objectId: appointment._id}}))
      .catch((err) => {
        console.log(err)
        if(err.statusCode) {
          return Promise.resolve({statusCode: err.statusCode, result: err.result})
        } else {
          return Promise.resolve({statusCode: 400, result: err})
        }
      });
  }

  
  static getAppointments(current) {
    return this.appointmentModel.getAppointments(current)
      .then((appointments) => ({statusCode: 200, result: appointments}));
  }

  static getDoctorAppointments(doctorId, patientId, current) {
    return this.appointmentModel.getDoctorAppointments(doctorId, patientId, current)
      .then((appointments) => ({statusCode: 200, result: appointments}));
  }

  static getPatientAppointments(patientId, doctorId, current) {
    return this.appointmentModel.getPatientAppointments(patientId, doctorId, current)
      .then((appointments) => ({statusCode: 200, result: appointments}));
  }

  static getWorkHour(doctorId, start, end) {
    return this.appointmentModel.getWorkHour(doctorId, start, end)
      .then((result) => ({statusCode: 200, result: result}));
  }

  static findFreeSchedule(doctorId, start, end) {
    return this.appointmentModel.findFreeSchedule(doctorId, start, end)
      .then((result) => ({statusCode: 200, result: result}));
  }


}
module.exports = appointmentController;
