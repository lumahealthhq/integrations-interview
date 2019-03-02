import boom from 'boom';
import {Sequelize} from 'sequelize';

import sequelize from '../db';
import Doctor from '../models/doctor';
import Schedule from "../models/schedule";

const createDoctor = async (doctor) => {
    await Doctor.sync();
    return Doctor.create(doctor);
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

    const existingSchedules = await doctor.getSchedules();
    return sequelize.transaction((t) => {
        schedules.forEach((schedule) => {
            const schedulePromise = Schedule.create(schedule, {transaction: t});
            schedulePromises.push(schedulePromise);
        });
        return Promise.all(schedulePromises);
    }).then(res => doctor.addSchedules([...existingSchedules, ...res]));
};

// on update I am assuming that it is updating(replaced on its entirety) with a updated  list of schedules
const updateDoctorSchedules = async (doctorId, schedules) => {
    const doctor = await Doctor.findByPk(doctorId);
    const schedulePromises = [];
    if (!doctor) {
        throw boom.notFound("Doctor not found with id: " + doctorId);
    }
    return sequelize
        .transaction((t) => {
            schedules.forEach((schedule) => {
                const schedulePromise = Schedule.create(schedule, {transaction: t});
                schedulePromises.push(schedulePromise);
            });
            return Promise.all(schedulePromises).then(res => doctor.setSchedules(res).then(() => {
                t.commit();
            }));
        });
};

const getDoctorSchedules = async (doctorId) => {
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
        throw boom.notFound("Doctor not found with id: " + doctorId);
    }

    return doctor.getSchedules();
};

const Op = Sequelize.Op;

const getBookedAppointments = async (doctorId) => {
    const doctor = await Doctor.findByPk(doctorId);
    return doctor.getAppointments();
};

const isDoctorAlreadyBooked = async (doctor, bookingDetails) => {
    const appointments = await doctor.getAppointments({
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

const isDoctorAvailable = async (doctor, bookingDetails) => {
    const schedules = await doctor.getSchedules({
        where: {
            availableFrom: {
                [Op.gte]: bookingDetails.startAt
            },
            availableTo: {
                [Op.lte]: bookingDetails.endAt
            }
        }
    });

    return schedules.length > 0;
};

export {
    createDoctor,
    updateDoctor,
    createDoctorSchedules,
    updateDoctorSchedules,
    getDoctorSchedules,
    isDoctorAlreadyBooked,
    isDoctorAvailable,
    getBookedAppointments
};

