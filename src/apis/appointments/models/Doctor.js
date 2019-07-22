import { Schema } from 'mongoose';

const timeRangeSchema = new Schema({
  start: String,
  end: String
});

const workingDaysSchema = new Schema({
  times: [timeRangeSchema],
  weekDay: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  }
});

const schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  workingDays: workingDaysSchema,
});

export default schema;
