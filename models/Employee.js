const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeID: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
