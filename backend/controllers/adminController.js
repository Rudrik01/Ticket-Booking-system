// controllers/adminController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Event = require('../models/Event');
const config = require('../config/config');

// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add Event
exports.addEvent = async (req, res) => {
  const { title, date, description, seatsAvailable } = req.body;

  try {
    const event = new Event({
      title,
      date,
      description,
      seatsAvailable
    });

    await event.save();

    res.status(201).json({ msg: 'Event added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// List Events
exports.listEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, date, description, seatsAvailable } = req.body;

  try {
    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    event.title = title || event.title;
    event.date = date || event.date;
    event.description = description || event.description;
    event.seatsAvailable = seatsAvailable || event.seatsAvailable;

    await event.save();

    res.json({ msg: 'Event updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    await event.remove();

    res.json({ msg: 'Event deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
