const userService = require('../services/userService');

const addUser = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const result = await userService.addUser(name, email, password);
  return res.status(201).json(result);
};

module.exports = {
  addUser,
};