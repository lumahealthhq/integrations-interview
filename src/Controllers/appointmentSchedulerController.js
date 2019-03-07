
var appointmentSchedulerService = require('../Services/appointmentSchedulerService');
 
const addNewDoctor = async (req, res) => {
    try {
        console.log(`in side addNewDoctorController`)
		await appointmentSchedulerService.addNewDoctor(req, res);
	} catch (err) {
		res.statusCode = 500;
		return res.send(err);
	}
}

const getWorkingHoursDoctor = async (req, res) => {
    try {
        console.log(`In side getWorkingHoursDoctor Controller`)
		await appointmentSchedulerService.getWorkingHoursDoctor(req, res);
	} catch (err) {
		res.statusCode = 500;
		return res.send(err);
	}
}

const bookDoctorOpening = async (req, res) => {
    try {
        console.log(`In side bookDoctorOpening Controller`)
		await appointmentSchedulerService.bookDoctorOpening(req, res);
	} catch (err) {
		res.statusCode = 500;
		return res.send(err);
	}
}

const createUpdateWorkingHoursDoctor = async (req, res) => {
    try {
        console.log(`In side createUpdateWorkingHoursDoctor Controller`)
		await appointmentSchedulerService.createUpdateWorkingHoursDoctor(req, res);
	} catch (err) {
		res.statusCode = 500;
		return res.send(err);
	}
}

module.exports = {
    addNewDoctor,
    getWorkingHoursDoctor,
    bookDoctorOpening,
    createUpdateWorkingHoursDoctor
}
