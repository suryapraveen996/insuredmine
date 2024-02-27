const { Message } = require('../model/message.model');
const schedule = require('node-schedule');
const moment = require('moment');
const lib = {}

require('../model/mongodb/index')

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