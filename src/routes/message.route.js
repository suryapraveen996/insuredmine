const express = require('express');
const router = express.Router();

module.exports = router;

const messageCtrl = require('../controller/message.controller');

router.post('/', schedule);

async function schedule(req, res) {
  // Extract message, day, and time from request body
  const { message, day, time } = req.body;

  // Validate input data (you can add more validation as needed)
  if (!message || !day || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    messageCtrl.scheduleMsg(message, day, time)
    res.status(200).json({ message: 'Message scheduled successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

