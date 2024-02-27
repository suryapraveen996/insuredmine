const mongoose = require('mongoose');
const my_app = 'insuredmine';

let uri = `mongodb://localhost:27017/${my_app}`

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(uri, connectOptions)
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});


// Handle disconnection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = mongoose.connection;