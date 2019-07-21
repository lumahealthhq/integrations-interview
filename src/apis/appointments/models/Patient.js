import mongoose from 'mongoose';
import db from '../';

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default db.model('Patient', schema);