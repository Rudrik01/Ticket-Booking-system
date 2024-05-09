// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all events
router.get('/', eventController.getAllEvents);

// Book an event
router.post('/book/:id', authMiddleware, eventController.bookEvent);

// View booking history (protected route)
router.get('/booking-history', authMiddleware, eventController.bookingHistory);

module.exports = router;
