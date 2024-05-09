// models/Event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  seatsAvailable: { type: Number, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
