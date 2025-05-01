const Registration = require('../models/Registration');
const { parse } = require('json2csv');

exports.getAttendees = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const attendees = await Registration.find({ event: eventId }).populate('user', 'name email studentId');
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.checkInAttendee = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    const registration = await Registration.findOne({ user: userId, event: eventId });

    if (!registration) return res.status(404).json({ message: 'Registration not found' });

    registration.checkedIn = true;
    await registration.save();

    res.status(200).json({ message: 'User checked in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.exportAttendees = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const registrations = await Registration.find({ event: eventId }).populate('user', 'name email studentId');

    const csvData = parse(registrations.map(r => ({
      name: r.user.name,
      email: r.user.email,
      studentId: r.user.studentId,
      checkedIn: r.checkedIn,
      timestamp: r.timestamp
    })));

    res.header('Content-Type', 'text/csv');
    res.attachment(`event-${eventId}-attendees.csv`);
    return res.send(csvData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
