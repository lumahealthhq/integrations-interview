import * as appointmentService from "../services/appointment-service";

const bookAppointment = async (req, res, next) => {
    const { patientId, doctorId } = req.params;
    const body = req.body;
    try {
        const appointment = await appointmentService.bookAppointment(patientId, doctorId, body);
        console.log("createPatient: Appointment created with Id:", appointment.id);

        res.sendStatus(201);
    } catch (e) {
        console.error("createPatient:", e);
        return next(e);
    }
};

export { bookAppointment };