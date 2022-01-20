const productsModel = require('../models/productsModel');

// Função auxiliar para gerar mensagens de erros
const error = (code, message) => {
  const err = { err: { err: { code, message } } };
  return err;
};

// Função auxiliar para validar quantidade antes de adicionar produto
const verifyQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    return error('invalid_data', '"quantity" must be a number');
  }
  if (quantity < 1) {
    return error('invalid_data', '"quantity" must be larger than or equal to 1');
  }
};

// Buscar todos os produtos 
const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

// Buscar produto pelo ID 
const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) {
    return error('invalid_data', 'Wrong id format');
  }
  return result;
};

// Adicionar novo produto
const addProduct = async (name, quantity) => {
  if (typeof name !== 'string' || name.length <= 5) {
    return error('invalid_data', '"name" length must be at least 5 characters long');
  }
  const doesTheProductExists = await productsModel.getProductByName(name);
  if (doesTheProductExists) return error('invalid_data', 'Product already exists');
  const validation = verifyQuantity(quantity);
  if (validation) return validation;
  const product = await productsModel.addProduct(name, quantity);
  return { product };
};

// Editar produto
const editProduct = async (id, name, quantity) => {
  if (typeof name !== 'string' || name.length <= 5) {
    return error('invalid_data', '"name" length must be at least 5 characters long');
  }
  const validation = verifyQuantity(quantity);
  if (validation) return validation;
  const product = await productsModel.editProduct(id, name, quantity);
  return { product };
};

// Deletar produto
const deleteProduct = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) {
    return error('invalid_data', 'Wrong id format');
  }
  const product = await productsModel.deleteProduct(id);
  return { product };
};

module.exports = {
  getAll,
  getById,
  addProduct,
  editProduct,
  deleteProduct,
};