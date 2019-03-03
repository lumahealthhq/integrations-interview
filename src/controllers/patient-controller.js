import * as patientService from "../services/patient-service";

const createPatient = async (req, res, next) => {
    const body = req.body;
    try {
        const createdPatient = await patientService.createPatient(body);
        console.log("createPatient: Patient created with Id:", createdPatient.id);

        res.status(201).json(createdPatient);
    } catch (e) {
        console.error("createPatient:", e.message);
        return next(e);
    }
};

const getPatients = async (req, res, next) => {
    try {
        const patients = await patientService.getPatients();

        res.json(patients);
    } catch (e) {
        console.error("getPatients:", e.message);
        return next(e);
    }
};

const getPatientAppointments = async (req, res, next) => {
    const {patientId} = req.params;
    try {
        const appointments = await patientService.getBookedAppointments(patientId);
        res.json(appointments);
    } catch (e) {
        console.error("getPatients:", e.message);
        return next(e);
    }
};

export {createPatient, getPatients, getPatientAppointments};