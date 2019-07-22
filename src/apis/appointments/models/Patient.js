import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default schema;