const userService = require('../services/userService');

const notValid = () => ({ message: 'Invalid entries. Try again.' });
const duplicatedEmail = () => ({ message: 'Email already registered' });

const checkFields = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json(notValid());
  }

  next();
};

const regexEmail = (email) => {
  const testEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
  return testEmail.test(email);
};

const isEmailUnique = async (email) => {
  const result = await userService.findEmail(email);
  return result;
};

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!regexEmail(email)) return res.status(400).json(notValid());
  const result = await isEmailUnique(email);
  if (result !== null) return res.status(409).json(duplicatedEmail());
  next();
};

module.exports = {
  checkFields,
  checkEmail,
};