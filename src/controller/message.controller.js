// Connect to MongoDB (Assuming MongoDB is used)
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const moment = require('moment');
const lib = {}

//TODO: create a common model
mongoose.connect('mongodb://localhost:27017/insuredmine', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define a schema for the message model
const messageSchema = new mongoose.Schema({
    msg: String,
    day: String,
    time: String
  });
  
// Create a model based on the schema
const Message = mongoose.model('Message', messageSchema);
  
lib.scheduleMsg = async (msg, day, time) => {
  try {
    const cronSchedule = moment(`${day} ${time}`).format('X');

    const startDate = moment(cronSchedule, 'X');
    const startDateObject = startDate.toDate();
    
    // Schedule the message insertion
    const startJob = schedule.scheduleJob(startDateObject, async () => {
      // Create a new message document
      const newMessage = new Message({
        msg,
        day,
        time
      });

      // Save the message to the database
      await newMessage.save();
    });

    startJob.start();
    return
  } catch(err) {
    return err
  }
}

module.exports = lib