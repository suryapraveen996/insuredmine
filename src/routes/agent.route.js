const express = require('express');
const router = express.Router();

module.exports = router;

const agentCtrl = require('../controller/agent.controller');

router.post('/upload', uploadXls)
router.get('/policy/:username', findInfo)
router.get('/', fetchAgg)

async function uploadXls(req, res) {
  try {
    agentCtrl.uploadFile(req.body)
    res.status(200).json({ message: 'File Uploaded successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function findInfo(req, res) {
    try {
      const username = req.params.username;
      const response = await agentCtrl.fetchData(username)
      res.status(200).json({ response });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
}

async function fetchAgg(req, res) {
  try {
    // For example:
    const aggregatedPolicies = await agentCtrl.fetchAgg()

    res.status(200).json({ aggregatedPolicies });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}