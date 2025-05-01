const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, eventController.createEvent);
router.get('/', authMiddleware.verifyToken, eventController.getEvents);
router.post('/register/:eventId', authMiddleware.verifyToken, eventController.registerEvent);

module.exports = router;
