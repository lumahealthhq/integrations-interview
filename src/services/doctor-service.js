import boom from 'boom';
import {Sequelize} from 'sequelize';

import sequelize from '../db';
import Doctor from '../models/doctor';
import Schedule from "../models/schedule";

const Op = Sequelize.Op;

const createDoctor = (doctor) => {
    return Doctor.create(doctor);
};

const getDoctors = () => {
    return Doctor.findAll();
};

const updateDoctor = async (doctorId, dataToBeUpdated) => {
    const doctor = await Doctor.findByPk(doctorId);
    return doctor.update(dataToBeUpdated);
};

const createDoctorSchedules = async (doctorId, schedules) => {
    const doctor = await Doctor.findByPk(doctorId);
    await Schedule.sync();
    const schedulePromises = [];
    if (!doctor) {
        throw boom.notFound("Doctor not found with id: " + doctorId);
    }

    return sequelize.transaction((transaction) => {
        schedules.forEach((schedule) => {
            const schedulePromise = Schedule.create(schedule, {transaction});
            schedulePromises.push(schedulePromise);
        });
        return Promise.all(schedulePromises)
            .then(createdSchedules => {
                return doctor.addSchedules(createdSchedules, {transaction});
            });
    });
};

// on update I am assuming that it is updating(replaced on its entirety) with a updated  list of schedules
const updateDoctorSchedules = async (doctorId, schedules) => {
    const doctor = await Doctor.findByPk(doctorId);
    const schedulePromises = [];
    if (!doctor) {
        throw boom.notFound("Doctor not found with id: " + doctorId);
    }

    return sequelize.transaction((transaction) => {
        schedules.forEach((schedule) => {
            const schedulePromise = Schedule.create(schedule, {transaction});
            schedulePromises.push(schedulePromise);
        });
        return Promise.all(schedulePromises)
            .then(createdSchedules => {
                return doctor.setSchedules(createdSchedules, {transaction});
            });
    });
};

const getDoctorSchedules = async (doctorId) => {
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
        throw boom.notFound("Doctor not found with id: " + doctorId);
    }

    return doctor.getSchedules();
};

const getBookedAppointments = async (doctorId) => {
    const doctor = await Doctor.findByPk(doctorId);
    return doctor.getAppointments();
};

const isDoctorAlreadyBooked = async (doctor, bookingDetails) => {
    const appointments = await doctor.getAppointments({
        where: {
            startAt: {
                [Op.lte]: bookingDetails.startAt
            },
            endAt: {
                [Op.gte]: bookingDetails.endAt
            }
        }
    });

    return appointments.length > 0;
};

const isDoctorAvailable = async (doctor, bookingDetails) => {
    const schedules = await doctor.getSchedules({
        where: {
            availableFrom: {
                [Op.lte]: bookingDetails.startAt
            },
            availableTo: {
                [Op.gte]: bookingDetails.endAt
            }
        }
    });
    // console.info("::schedules", schedules);
    return schedules.length > 0;
};

export {
    createDoctor,
    updateDoctor,
    getDoctors,
    createDoctorSchedules,
    updateDoctorSchedules,
    getDoctorSchedules,
    isDoctorAlreadyBooked,
    isDoctorAvailable,
    getBookedAppointments
};

