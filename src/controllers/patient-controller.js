import * as patientService from "../services/patient-service";

const createPatient = async (req, res, next) => {
    const body = req.body;
    try {
        const createdPatient = await patientService.createPatient(body);
        console.log("createPatient: Patient created with Id:", createdPatient.id);

        res.sendStatus(201);
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

export {createPatient, getPatients};