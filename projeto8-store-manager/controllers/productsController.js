const productsService = require('../services/productsService');

// Buscar todos os produtos
const getAll = async (_req, res) => {
  const result = await productsService.getAll();
  
  return res.status(200).json({ products: result });
};

// Buscar produto pelo ID
const getById = async (req, res) => {
  const result = await productsService.getById(req.params.id);
  
  if (result.err) return res.status(422).json(result.err);
  
  res.status(200).json(result);
};

// Adicionar novo produto
const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  
  const { err, product } = await productsService.addProduct(name, quantity);
  
  if (!product) return res.status(422).json(err);
  
  res.status(201).json(product);
};

// Editar um produto
const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { err, product } = await productsService.editProduct(id, name, quantity);
  
  if (err) {
    return res.status(422).json(err);
  }
  
  if (product) {
    return res.status(200).json({ _id: id, name, quantity });
  }
};

// Deleta um produto do banco
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { err } = await productsService.getById(id);
  
  if (err) {
    return res.status(422).json(err);
  }
  
  const deletedProduct = await productsService.deleteProduct(id);
  
  return res.status(200).json(deletedProduct);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  editProduct,
  deleteProduct,
};
