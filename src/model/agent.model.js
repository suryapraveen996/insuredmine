const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: String,
});
  
const userSchema = new mongoose.Schema({
  firstName: String,
  dob: Date,
  address: String,
  phone: String,
  state: String,
  zip: String,
  email: String,
  gender: String,
  userType: String,
});

const accountSchema = new mongoose.Schema({
accountName: String,
});

const categorySchema = new mongoose.Schema({
categoryName: String,
});

const carrierSchema = new mongoose.Schema({
companyName: String,
});
  
const policySchema = new mongoose.Schema({
  policyNumber: String,
  startDate: Date,
  endDate: Date,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  carrier: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
  
const Agent = mongoose.model('Agent', agentSchema);
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);
const Category = mongoose.model('Category', categorySchema);
const Carrier = mongoose.model('Carrier', carrierSchema);
const Policy = mongoose.model('Policy', policySchema);

module.exports = {
  Agent,
  User,
  Account,
  Category,
  Carrier,
  Policy
}