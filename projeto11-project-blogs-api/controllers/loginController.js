const jwt = require('jsonwebtoken');
const { Users } = require('../models');

require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email, password } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = jwt.sign({
      displayName: user.displayName,
      email: user.email,
      userId: user.id,
    }, 'secret', { expiresIn: '8h' });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  login,
};