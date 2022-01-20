const jwt = require('jsonwebtoken');

const userService = require('../services/userService');

const secret = 'seuTokenSecret';

const checkToken = async (req, res, _next) => {
  const { email } = req.body;

  const result = await userService.findEmail(email);
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  console.log(result);
  const { _id, role } = result;

  const token = jwt.sign(
    { id: _id, email, role },
      secret,
      jwtConfig,
    );
  
  return res.status(200).json({ token });
};

module.exports = {
  checkToken,
};