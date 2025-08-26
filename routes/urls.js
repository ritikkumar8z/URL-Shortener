const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// @route   POST /api/shorten
// @desc    Create short URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  // Check if base URL and original URL are valid
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base URL');
  }

  if (validUrl.isUri(originalUrl)) {
    try {
      // Check if URL already exists
      let url = await Url.findOne({ originalUrl });

      if (url) {
        res.json(url);
      } else {
        // Generate short code
        const shortCode = nanoid(8);
        const shortUrl = `${baseUrl}/${shortCode}`;

        url = new Url({
          originalUrl,
          shortCode,
          shortUrl
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid original URL');
  }
});

// @route   GET /api/urls
// @desc    Get all URLs (Admin)
router.get('/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

// @route   DELETE /api/urls/:id
// @desc    Delete URL (Admin)
router.delete('/urls/:id', async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ message: 'URL deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;