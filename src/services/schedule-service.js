import Schedule from '../models/schedule';

const createSchedule = async (schedule) => {
    try {
        await Schedule.sync();
        return await Schedule.create(schedule);
    } catch(err) {
        throw new Error(err.message);
    }
};

export { createSchedule };

