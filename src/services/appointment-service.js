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

    // Check if patient has any appointment overlapped with this booking details
    const isPatientAlreadyBooked = await patientService.isPatientAlreadyBooked(patient, bookingDetails);
    if (isPatientAlreadyBooked) {
        throw boom.conflict("Patient is booked during this period");
    }

    // Check if doctor has any appointment overlapped with this booking details
    const isDoctorAlreadyBooked = await doctorService.isDoctorAlreadyBooked(doctor, bookingDetails);
    if (isDoctorAlreadyBooked) {
        throw boom.conflict("Doctor is booked during this period");
    }

    // Check if this booking details is within Doctor's available schedule
    const isDoctorAvailable = await doctorService.isDoctorAvailable(doctor, bookingDetails);
    if (isDoctorAvailable) {
        throw boom.notAcceptable("Doctor not available during this period");
    }

    // Start a transaction for booking the appointment
    return sequelize.transaction((transaction) => {
        return Appointment.create(bookingDetails, {transaction})
            .then(appointment => {
                return doctor.addAppointment(appointment, {transaction})
                    .then(() => {
                        return patient.addAppointment(appointment, {transaction});
                    });
            });
    });
};

export {bookAppointment};