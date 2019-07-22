import { Schema } from 'mongoose';
import moment from 'moment';

const timeRangeSchema = new Schema({
  start: String,
  end: String
}, { _id: false });

const workingDaysSchema = new Schema({
  times: [timeRangeSchema],
  weekDay: {
    type: String,
    enum: moment.weekdays(),
  }
}, { _id: false });

const schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  workingDays: [workingDaysSchema],
});

export default schema;
