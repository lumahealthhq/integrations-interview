import boom from "boom";

import sequelize from '../db';
import Appointment from '../models/appointment';
import * as doctorService from './doctor-service';
import * as patientService from './patient-service';
import Patient from "../models/patient";
import Doctor from "../models/doctor";

const bookAppointment = async (doctorId, patientId, bookingDetails) => {
    const patient = await Patient.findByPk(patientId);
    const doctor = await Doctor.findByPk(doctorId);

    if (!patient) {
        throw boom.notFound("Patient not found with id: " + patientId);
    }
    if (!doctor) {
        throw boom.notFound("Doctor not found with id: " + doctorId);
    }
    const isPatientAlreadyBooked = await patientService.isPatientAlreadyBooked(patient, bookingDetails);
    if (isPatientAlreadyBooked) {
        throw boom.conflict("Patient is already booked during this period");
    }

    const isDoctorAlreadyBooked = await doctorService.isDoctorAlreadyBooked(doctor, bookingDetails);
    if (isDoctorAlreadyBooked) {
        throw boom.conflict("Doctor is already booked during this period");
    }

    return sequelize.transaction().then((t) => {
        return Appointment.create(bookingDetails, {transaction: t})
            .then(appointment => {
                return doctor.addAppointment(appointment, {transaction: t})
                    .then(() => {
                        return patient.addAppointment(appointment, {transaction: t}).then(() => {
                            t.commit();
                        });
                    });
            });
    }).then(() => {
        console.info("Booked appointment successfully");
    });
};

export {bookAppointment};