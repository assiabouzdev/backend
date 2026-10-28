
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  email: { type: String },
  phone: { type: String },
  gender: { type: String },
  level: { type: String },
  isActive: { type: Boolean },
  courses: [String],
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String }
  },
  grades: {
    average: { type: Number },
    count: { type: Number }
  }
});

module.exports = mongoose.model('Student', studentSchema);
