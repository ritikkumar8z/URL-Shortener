const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Url = require('./models/Url');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortener');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api', require('./routes/urls'));

// @route   GET /:shortcode
// @desc    Redirect to original URL
app.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (url) {
      // Increment click count
      await Url.findByIdAndUpdate(url._id, { $inc: { clicks: 1 } });
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json('URL not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));