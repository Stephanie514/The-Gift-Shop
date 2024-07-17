// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Assuming you have a Contact model

// POST /api/contact
// Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save the contact form data to MongoDB (assuming you have a Contact model)
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Optionally, send a response to the frontend
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;