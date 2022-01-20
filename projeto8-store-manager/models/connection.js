const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Dica do Cesar Bhering
// const MONGO_DB_URL = 'mongodb://localhost:27017'; // <- para teste local
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; // <- para teste remoto
const DB_NAME = 'StoreManager';

let db = null;
const connection = () => MongoClient.connect(MONGO_DB_URL, OPTIONS)
  .then((conn) => {
  db = conn.db(DB_NAME);
  return db;
  }).catch((err) => {
    console.error(err);
    console.exit();
  });

module.exports = connection;