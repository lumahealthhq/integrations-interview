import { Schema } from 'mongoose';
import db from '../';

const schema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  },
  at: Date,
  status: {
    type: String,
    enum: [ 'Scheduled', 'Canceled', 'Completed' ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default db.model('Appointment', schema);
