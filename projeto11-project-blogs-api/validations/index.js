const { userValidation } = require('./userValidation');
const { loginValidation } = require('./loginValidation');
const { categoryValidation } = require('./categoryValidation');
const { postValidation } = require('./postValidation');

module.exports = {
  userValidation,
  loginValidation,
  categoryValidation,
  postValidation,
};