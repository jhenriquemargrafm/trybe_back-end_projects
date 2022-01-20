const connection = require('./connection');

const findEmail = async (email) => { 
    const result = await connection()
    .then((db) => db.collection('users').findOne({ email }));
    return result;
};

const getUserById = async (name) => { 
  const result = await connection()
  .then((db) => db.collection('users').findOne({ name }));
  return result;
};

const addUser = async (name, email, password, role) => {
  const result = await connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role }));
  return result;
};

module.exports = {
  findEmail,
  addUser,
  getUserById,
};