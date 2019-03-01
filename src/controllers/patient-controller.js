import * as patientService from "../services/patient-service";

const createPatient = async (req, res, next) => {
    const body = req.body;
    try {
        const createdPatient = await patientService.createPatient(body);
        console.log("createPatient: Patient created with Id:", createdPatient.id);

        res.sendStatus(201);
    } catch (e) {
        console.error("createPatient:", e);
        return next(e);
    }
};

export { createPatient };