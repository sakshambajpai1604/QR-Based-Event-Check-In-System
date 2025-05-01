const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  checkedIn: { type: Boolean, default: false },
  qrCodeData: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Registration', registrationSchema);
