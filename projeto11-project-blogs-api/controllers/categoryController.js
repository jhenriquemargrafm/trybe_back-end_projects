const jwt = require('jsonwebtoken');
const { Categories } = require('../models');

const isTokenValid = (auth) => {
  const validToken = jwt.verify(auth, 'secret', (error, decoded) => {
    if (error) return null;

    return decoded;
  });

  return validToken;
};

// Requisito 5
const createCategory = async (req, res) => {
  const { name } = req.body;
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validToken = isTokenValid(auth);
  if (!validToken) return res.status(401).json({ message: 'Expired or invalid token' });

  try {
    const doesCategoryExist = await Categories.findOne({ where: { name } });
    if (doesCategoryExist) {
      return res.status(409).json({ message: 'Category already registered' });
    }

    const createdCategory = await Categories.create({ name });

    return res.status(201).json(createdCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Requisito 6
const listCategories = async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validToken = isTokenValid(auth);

  if (!validToken) return res.status(401).json({ message: 'Expired or invalid token' });

  try {
    const users = await Categories.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports = {
  createCategory,
  listCategories,
};