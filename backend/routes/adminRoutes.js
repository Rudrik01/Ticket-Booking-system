// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', adminController.login);
router.post('/add-event', adminController.addEvent);
router.get('/list-events', adminController.listEvents);
router.put('/update-event/:id', adminController.updateEvent);
router.delete('/delete-event/:id', adminController.deleteEvent);

module.exports = router;
