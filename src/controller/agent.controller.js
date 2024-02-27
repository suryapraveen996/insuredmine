const { 
  Agent,
  User,
  Account,
  Category,
  Carrier,
  Policy
} = require('../model/agent.model');

require('../model/mongodb/index')

const lib = {}

lib.uploadFile = async (data) => {
  try {
    const agent = await Agent.create({ name: data.agent });
    const user = await User.create({ 
      firstName: data.firstname,
      dob: data.dob,
      address: data.address,
      phone: data.phone,
      state: data.state,
      zip: data.zip,
      email: data.email,
      gender: data.gender,
      userType: data.userType,
    });
    const account = await Account.create({ accountName: data.account_name });
    const category = await Category.create({ categoryName: data.category_name });
    const carrier = await Carrier.create({ companyName: data.company_name });
    const policy = await Policy.create({
      policyNumber: data.policy_number,
      startDate: (data.policy_start_date),
      endDate: (data.policy_end_date),
      category: category._id,
      carrier: carrier._id,
      agent: agent._id,
      user: user._id,
    });
  return
  } catch (error) {
    console.error('Error:', error);
    return err
  }
}

lib.fetchData = async (username) => {
  try {
    const user = await User.findOne({ firstName: username }).exec();
      const policies = await Policy.find({ user: user._id }).populate('category').populate('carrier').exec();
  return policies;
  } catch (error) {
    console.error('Error:', error);
    return null
  }
}

lib.fetchAgg = async () => {
  try {
    const aggregatedPolicies = await Policy.aggregate([
      { $group: { _id: '$user', count: { $sum: 1 } } },
    ]).exec();
  return aggregatedPolicies;
  } catch (error) {
    console.error('Error:', error);
    return null
  }
}
module.exports = lib;