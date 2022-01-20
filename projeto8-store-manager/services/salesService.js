const { ObjectID } = require('mongodb');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

// Função auxiliar para gerar mensagens de erros
const error = (code, message) => {
  const err = { err: { err: { code, message } } };
  return err;
};

// Buscar todas as vendas
const getAll = async () => {
  const products = await salesModel.getAll();
  return products;
};

// Buscar venda pelo ID
const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (!result) {
    return error('not_found', 'Sale not found');
  }
  return result;
};

// Função auxiliar para validar quantidade na hora de adicionar
const validateQuantity = (sales) => {
  const verifyQuantity = sales.every(({ quantity }) => quantity > 0);
  const verifyType = sales.every(({ quantity }) => typeof quantity === 'number');
  const validateId = sales.every(({ productId }) => ObjectID.isValid(productId));
  
  if (!verifyQuantity || !verifyType || !validateId) return true;
};

// Funções auxiliares para atualizar produtos de acordo com vendas
const validateQuantitySituation = (db, sales) => {
  // Algum sales.quantity < db quantity
  let err = false;
  for (let index = 0; index <= sales.length - 1; index += 1) {
    const quantityOfThisSale = sales[index].quantity;
    const product = db.find(({ _id }) => _id.toString() === sales[index].productId.toString());
    if (quantityOfThisSale > product.quantity) {
      err = true;
    }
  }
  if (err === true) return true;
};

const updateProduct = (db, sales) => {
  for (let index = 0; index <= sales.length - 1; index += 1) {
    const quantityOfThisSale = sales[index].quantity;
    const product = db.find(({ _id }) => _id.toString() === sales[index].productId.toString());  
    const newStock = product.quantity - quantityOfThisSale;
    productsModel.editProduct(sales[index].productId, product.name, newStock);
  }
};

const updateProductsAfterDeletion = (db, sales) => {
  for (let index = 0; index <= sales.length - 1; index += 1) {
    const quantityOfThisSale = sales[index].quantity;
    const product = db.find(({ _id }) => _id.toString() === sales[index].productId.toString());  
    const newStock = product.quantity + quantityOfThisSale;
    productsModel.editProduct(sales[index].productId, product.name, newStock);
  }
};

const updateProductsWhenEditing = (db, sales, oldSales) => {
  for (let index = 0; index <= sales.length - 1; index += 1) {
    const quantityOfThisSale = sales[index].quantity;
    const quantityOfTheOldSale = oldSales[index].quantity;
    const product = db.find(({ _id }) => _id.toString() === sales[index].productId.toString());  
    const newStock = product.quantity + quantityOfTheOldSale - quantityOfThisSale;
    productsModel.editProduct(sales[index].productId, product.name, newStock);
  }
};

const validateNewQuantity = (db, sales, oldSales) => {
  // Algum sales.quantity < db quantity
  let err = false;
  for (let index = 0; index <= sales.length - 1; index += 1) {
    const quantityOfThisSale = sales[index].quantity;
    const quantityOfTheOldSale = oldSales[index].quantity;
    const product = db.find(({ _id }) => _id.toString() === sales[index].productId.toString());
    if (quantityOfThisSale > product.quantity + quantityOfTheOldSale) {
      err = true;
    }
  }
  if (err === true) return true;
};

// Adicionar nova venda
const addSales = async (sales) => {
  const validation = validateQuantity(sales);
  if (validation) return error('invalid_data', 'Wrong product ID or invalid quantity');

  const db = await productsModel.getAll();
  // Analisando se o Id existe no banco
  const idSituation = sales.every(({ productId }) => {
    const approval = db.some(({ _id }) => productId.toString() === _id.toString());
    return approval;
  });

  if (!idSituation) return error('invalid_data', 'Wrong product ID or invalid quantity');

  const erro = validateQuantitySituation(db, sales);
  if (erro) return error('stock_problem', 'Such amount is not permitted to sell');

  updateProduct(db, sales);

  const addedSales = await salesModel.addSales(sales);
  return addedSales;
};

// Editar venda
const editSales = async (id, sales) => {
  const verifyQuantity = sales.every(({ quantity }) => quantity > 0);
  const verifyType = sales.every(({ quantity }) => typeof quantity === 'number');
  const validateId = sales.every(({ productId }) => ObjectID.isValid(productId));
  
  const db = await productsModel.getAll();
  const oldSales = await salesModel.getById(id);
  
  if (!verifyQuantity || !verifyType || !validateId) {
    return error('invalid_data', 'Wrong product ID or invalid quantity');
  }

  const erro = validateNewQuantity(db, sales, oldSales.itensSold);
  if (erro) return error('stock_problem', 'Such amount is not permitted to sell');
  updateProductsWhenEditing(db, sales, oldSales.itensSold);

  const editedSales = await salesModel.editSales(id, sales);
  return editedSales;
};

// Deletar venda
const deleteSales = async (id) => {
  const result = await salesModel.getById(id);
  if (!result) {
    return error('invalid_data', 'Wrong sale ID format');
  }
  
  const db = await productsModel.getAll();
  updateProductsAfterDeletion(db, result.itensSold);
  
  const sales = await salesModel.deleteSales(id);
  return sales;
};

module.exports = {
  getAll,
  getById,
  addSales,
  editSales,
  deleteSales,
};