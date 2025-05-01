const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/events/:eventId/attendees', authMiddleware.verifyToken, authMiddleware.isAdmin, adminController.getAttendees);
router.patch('/checkin', authMiddleware.verifyToken, authMiddleware.isAdmin, adminController.checkInAttendee);
router.get('/events/:eventId/export', authMiddleware.verifyToken, authMiddleware.isAdmin, adminController.exportAttendees);

module.exports = router;
