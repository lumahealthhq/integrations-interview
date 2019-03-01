import Patient from '../models/patient';

const createPatient = async (patient) => {
    await Patient.sync();
    return Patient.create(patient);
};

const updatePatient = async (patientId, dataToBeUpdated) => {
    const patient = await Patient.findByPk(patientId);
    return patient.update(dataToBeUpdated);
};

const getBookedAppointments = async (patientId) => {
    const patient = await Patient.findByPk(patientId);
    return patient.getAppointments();
};

const isPatientAlreadyBooked = async (patient, bookingDetails) => {
    const appointments = await patient.getAppointments({
        where: {
            [Op.gte]: bookingDetails.start,
            [Op.lte]: bookingDetails.end
        }
    });

    return appointments.length > 0;
};


export { createPatient, updatePatient, getBookedAppointments, isPatientAlreadyBooked};