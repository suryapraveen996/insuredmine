const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    msg: String,
    day: String,
    time: String
});
  
const Message = mongoose.model('Message', messageSchema);

module.exports = { Message }