class patientController {

  static get patientModel () {
    return global.PatientModel
  }

  static addPatient(firstName, lastName, gender, weight, height, origin, allergic) {
    return this.patientModel.createPatient(firstName, lastName, gender, weight, height, origin, allergic)
    .then((patient) => ({statusCode: 201, result: {objectId: patient._id, patientId: patient.patientId, patientName: patient.firstName }}))
      .catch((err) => {
        console.log(err)
        if(err.statusCode) {
          return Promise.resolve({statusCode: err.statusCode, result: err.result})
        } else {
          return Promise.resolve({statusCode: 400, result: err})
        }
      });

  }

  static getPatient() {
    return this.patientModel.getPatient()
      .then((patients) => ({statusCode: 200, result: patients}));
  }

  static getPatientById(id) {
    return this.patientModel.getPatientById(id)
      .then((patient) => ({statusCode: 200, result: patient}));
  }


}
module.exports = patientController;
