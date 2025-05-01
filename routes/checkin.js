const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.get('/', async (req, res) => {
  const { eventId, userId } = req.query;
  try {
    const registration = await Registration.findOne({ event: eventId, user: userId });
    if (!registration) return res.status(404).json({ message: 'Registration not found' });

    if (registration.checkedIn) return res.status(400).json({ message: 'User already checked in' });

    registration.checkedIn = true;
    await registration.save();

    res.status(200).send('✅ User checked in successfully!');
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
