const userService = require('../services/userService');

const unfilledFields = () => ({ message: 'All fields must be filled' });
const incorrectLogin = () => ({ message: 'Incorrect username or password' });

const checkLoginFields = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) return res.status(401).json(unfilledFields());
  
  next();
};

const regexEmail = (email) => {
  const testEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
  return testEmail.test(email);
};

const checkLoginInfo = async (req, res, next) => {
  const { email, password } = req.body;

  if (!regexEmail(email)) return res.status(401).json(incorrectLogin());
    
  const result = await userService.findEmail(email);
  if (!result || password !== result.password) {
    return res.status(401).json(incorrectLogin());
  }
  next();
};

module.exports = {
  checkLoginFields,
  checkLoginInfo,
};