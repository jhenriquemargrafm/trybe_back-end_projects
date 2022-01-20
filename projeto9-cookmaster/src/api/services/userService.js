const userModel = require('../models/userModel');

const findEmail = async (email) => {
  const result = await userModel.findEmail(email);
  return result;
};

const addUser = async (name, email, password) => {
  const role = 'user';
  const result = await userModel.addUser(name, email, password, role);

  return {
    user: {
      name,
      email,
      role,
      _id: result.insertedId,
    },
  };
};

module.exports = {
  findEmail,
  addUser,
};