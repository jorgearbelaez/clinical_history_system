const Record = require("./records.model");
const User = require("../users/users.model");

const getUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};
const getUserByIdentification = async (identification) => {
  const user = await User.findOne({ identification });

  return user;
};
const createRecord = async (body) => {
  const newRecord = await new Record(body);
  await newRecord.save();

  return newRecord;
};

module.exports = { getUserById, getUserByIdentification, createRecord };
