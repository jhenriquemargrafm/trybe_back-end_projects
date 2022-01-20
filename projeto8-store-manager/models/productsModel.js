const { ObjectId } = require('bson');
const mongoConnection = require('./connection');

// Buscar todos os produtos
const getAll = async () => {
  const db = await mongoConnection();
  const result = await db.collection('products').find({}).toArray();
  return result;
};

// Buscar pelo ID
const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  return result;
};

// Adicionar Produto
const addProduct = async (name, quantity) => {
  const { insertedId } = await mongoConnection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { 
    _id: insertedId, 
    name, 
    quantity,
  };
};

// Editar Produto
const editProduct = async (id, name, quantity) => {
  const db = await mongoConnection();
  const result = await db.collection('products').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
  );
  return result;
};

// Deletar Produto
const deleteProduct = async (id) => {
  const db = await mongoConnection();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return result;
};

// Função oriunda de validações
// Buscar pelo nome - Caso para verificar se o produto já existe na base de dados
const getProductByName = async (name) => {
  const db = await mongoConnection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

module.exports = {
  getAll,
  getById,
  addProduct,
  editProduct,
  deleteProduct,
  getProductByName,
};
