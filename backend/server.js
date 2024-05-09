const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://patelrudrik1601:8NbjAuCIpf1dvJh2@cluster0.csnr2wh.mongodb.net/event-ticket-booking', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  //useFindAndModify: false,
  
 // createIndexes: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/events', eventRoutes);

// Start server
const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
