const { ObjectId } = require('bson');
const mongoConnection = require('./connection');

// Buscar todos os produtos
const getAll = async () => {
  const db = await mongoConnection();
  const result = await db.collection('sales').find({}).toArray();
  return { sales: result };
};

// Buscar Sale por ID
const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return result;
};

// Adicionar Sales
const addSales = async (sales) => {
  const { insertedId } = await mongoConnection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));

  return { 
    _id: insertedId, 
    itensSold: sales,
  };
};

// Editar Produto
const editSales = async (id, sales) => {
  const db = await mongoConnection();
  const result = await db.collection('sales').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: sales } },
  );
  return result;
};

// Deletar venda
const deleteSales = async (id) => {
  const db = await mongoConnection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  getAll,
  getById,
  addSales,
  editSales,
  deleteSales,
};