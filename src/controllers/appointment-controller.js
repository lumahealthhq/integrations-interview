import * as appointmentService from "../services/appointment-service";

const bookAppointment = async (req, res, next) => {
    const { patientId, doctorId } = req.params;
    const body = req.body;
    try {
        const appointment = await appointmentService.bookAppointment(patientId, doctorId, body);
        console.info("bookAppointment: Booked appointment successfully with id:", appointment.id);

        res.sendStatus(201);
    } catch (e) {
        console.error("bookAppointment:", e.message);
        return next(e);
    }
};

export { bookAppointment };