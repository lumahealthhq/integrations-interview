import {Sequelize} from 'sequelize';
import Patient from '../models/patient';

const Op = Sequelize.Op;
const createPatient = async (patient) => {
    return Patient.create(patient);
};

const updatePatient = async (patientId, dataToBeUpdated) => {
    const patient = await Patient.findByPk(patientId);
    return patient.update(dataToBeUpdated);
};

const getPatients = async () => {
    return Patient.findAll();
};

const getBookedAppointments = async (patientId) => {
    const patient = await Patient.findByPk(patientId);
    return patient.getAppointments();
};

const isPatientAlreadyBooked = async (patient, bookingDetails) => {
    const appointments = await patient.getAppointments({
        where: {
            startAt: {
                [Op.gte]: bookingDetails.startAt
            },
            endAt: {
                [Op.lte]: bookingDetails.endAt
            }
        }
    });

    return appointments.length > 0;
};


export {createPatient, updatePatient, getPatients, getBookedAppointments, isPatientAlreadyBooked};