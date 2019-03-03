import * as doctorService from "../services/doctor-service";

const createDoctor = async (req, res, next) => {
    const body = req.body;
    try {
        const createdDoctor = await doctorService.createDoctor(body);
        console.log("createDoctor: Doctor created with Id:", createdDoctor.id);

        res.sendStatus(201);
    } catch (e) {
        console.error("createDoctor:", e.message);
        return next(e);
    }
};

const updateDoctor = async (req, res, next) => {
    const doctorId = req.params.doctorId;
    const body = req.body;
    try {
        const updatedDoctor = await doctorService.updateDoctor(doctorId, body);
        console.log("updateDoctor: Doctor updated with Id:", updatedDoctor.id);

        res.sendStatus(204);
    } catch (e) {
        console.error("updateDoctor:", e.message);
        return next(e);
    }
};

const createDoctorSchedules = async (req, res, next) => {
    const doctorId = parseInt(req.params.doctorId);
    const schedules = req.body;

    try {
        await doctorService.createDoctorSchedules(doctorId, schedules);
        console.log("createDoctorSchedules: Schedules created for doctor with Id:", doctorId);

        res.sendStatus(201);
    } catch (e) {
        console.error("createDoctorSchedules:", e.message);
        return next(e);
    }
};

const updateDoctorSchedules = async (req, res, next) => {
    const doctorId = parseInt(req.params.doctorId);
    const schedules = req.body;

    try {
        await doctorService.updateDoctorSchedules(doctorId, schedules);
        console.log("updateDoctorSchedules: Schedules updated for doctor with Id:", doctorId);

        res.sendStatus(204);
    } catch (e) {
        console.error("updateDoctorSchedules:", e.message);
        return next(e);
    }
};

const getDoctorSchedules = async (req, res, next) => {
    const doctorId = parseInt(req.params.doctorId);

    try {
        const schedules = await doctorService.getDoctorSchedules(doctorId);
        console.log("getDoctorSchedules: for doctor with Id:", doctorId);

        res.status(200).json(schedules);
    } catch (e) {
        console.error("getDoctorSchedules:", e.message);
        return next(e);
    }
};

const getDoctorAppointments = async (req, res, next) => {
    const {doctorId} = req.params;

    try {
        const appointments = await doctorService.getBookedAppointments(doctorId);
        console.log("getDoctorAppointments: Appointments for doctor with Id:", doctorId);

        res.status(200).json(appointments);
    } catch (e) {
        console.error("getDoctorAppointments:", e.message);
        return next(e);
    }
};

export {
    createDoctor,
    updateDoctor,
    createDoctorSchedules,
    updateDoctorSchedules,
    getDoctorSchedules,
    getDoctorAppointments
};