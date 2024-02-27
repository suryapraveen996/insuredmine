const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Worker } = require('worker_threads');
const upload = multer({ dest: 'uploads/' });

module.exports = router;

const agentCtrl = require('../controller/agent.controller');

router.post('/upload', upload.single('file'), uploadXls)
router.get('/policy/:username', findInfo)
router.get('/', fetchAgg)

async function uploadXls(req, res) {
  try {
    const csvFile = req.file.path;

    const worker = new Worker('./worker.js', {
      workerData: {
        csvFile: csvFile,
        mongoURL: 'mongodb://localhost:27017',
        dbName: 'insuredmine'
      }
    });

    worker.on('message', (message) => {
      res.send('CSV data uploaded successfully!');
    });

    worker.on('error', (error) => {
      console.error(error);
      res.status(500).send('Error processing CSV file');
    });
  } catch (error) {
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
    const aggregatedPolicies = await agentCtrl.fetchAgg()
    res.status(200).json({ aggregatedPolicies });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}