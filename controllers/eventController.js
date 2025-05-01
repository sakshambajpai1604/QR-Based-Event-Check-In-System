const Event = require('../models/Event');
const Registration = require('../models/Registration');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');

exports.createEvent = async (req, res) => {
  const { title, description, location, date, time } = req.body;
  try {
    const newEvent = new Event({ title, description, location, date, time });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.registerEvent = async (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.eventId;
  try {
    const existingRegistration = await Registration.findOne({ user: userId, event: eventId });
    if (existingRegistration) return res.status(400).json({ message: 'Already registered' });

    const qrData = { userId, eventId, timestamp: new Date() };
    const qrCodeData = await QRCode.toDataURL(JSON.stringify(qrData));

    const newRegistration = new Registration({ user: userId, event: eventId, qrCodeData });
    await newRegistration.save();

    // Send email with QR code
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: 'Event Registration Confirmation',
      html: `<p>You have successfully registered for the event.</p><img src="${qrCodeData}" alt="QR Code" />`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Registered successfully. QR code sent to email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
