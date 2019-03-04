class doctorController {

  static get doctorModel () {
    return global.DoctorModel
  }

  static addDoctor(firstName, lastName, gender, scheduleType, specialties) {
    return this.doctorModel.createDoctor(firstName, lastName, gender, scheduleType, specialties)
    .then((doctor) => ({statusCode: 201, result: {objectId: doctor._id, doctorId: doctor.doctorId, doctorName: doctor.firstName }}))
      .catch((err) => {
        console.log(err)
        if(err.statusCode) {
          return Promise.resolve({statusCode: err.statusCode, result: err.result})
        } else {
          return Promise.resolve({statusCode: 400, result: err})
        }
      });

  }

  static getDoctor() {
    return this.doctorModel.getDoctor()
      .then((doctors) => ({statusCode: 200, result: doctors}));
  }

  static getDoctorById(id) {
    return this.doctorModel.getDoctorById(id)
      .then((doctors) => ({statusCode: 200, result: doctors}));
  }

}
module.exports = doctorController;
