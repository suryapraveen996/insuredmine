const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const csv = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;
const csvFile = workerData.csvFile;
const mongoURL = workerData.mongoURL;
const agentCtrl = require('./src/controller/agent.controller');

async function processDataAndInsert() {
  try {
    const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true });
    const results = [];

    fs.createReadStream(csvFile)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
          await agentCtrl.uploadFile(row)
        }
        client.close();
        parentPort.postMessage('CSV data inserted into MongoDB collections successfully!');
      });
  } catch (error) {
    console.error(error);
    parentPort.postMessage('Error processing CSV file');
  }
}

processDataAndInsert();
