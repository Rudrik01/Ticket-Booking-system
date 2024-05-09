// controllers/eventController.js

const Event = require('../models/Event');
const Booking = require('../models/Booking');

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Book Event
exports.bookEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (event.seatsAvailable === 0) {
      return res.status(400).json({ msg: 'No seats available for this event' });
    }

    // Create booking
    const booking = new Booking({
      user: req.user.id,
      event: id
    });

    await booking.save();

    // Update seats available
    event.seatsAvailable -= 1;
    await event.save();

    res.json({ msg: 'Event booked successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Booking History
exports.bookingHistory = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
