const salesService = require('../services/salesService');

// Função auxiliar para gerar mensagens de erros
const error = (code, message) => {
  const err = { err: { code, message } };
  return err;
};

// Pegar todas as vendas
const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  
  return res.status(200).json(sales);
};

// Buscar venda pelo ID
const getById = async (req, res) => {
  const result = await salesService.getById(req.params.id);
  
  if (result.err) return res.status(404).json(result.err);
  
  res.status(200).json(result);
};

// Adicionar nova venda
const addSales = async (req, res) => {
  const arrayOfSales = req.body;
  const response = await salesService.addSales(arrayOfSales);
  
  if (response.err) return res.status(422).json(response.err);
  
  res.status(200).json(response);
};

// Editar um produto 
const editSales = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  const response = await salesService.editSales(id, sales);
  
  if (response.err) return res.status(422).json(response.err);
  
  res.status(200).json({ _id: id, itensSold: sales });
};

// Deleta uma venda do banco
const deleteSales = async (req, res) => {
  const { id } = req.params;
  const { err } = await salesService.getById(id);
  
  if (err) {
    return res.status(422).json(error('invalid_data', 'Wrong sale ID format'));
  }
  
  const deletedSales = await salesService.deleteSales(id);
  
  return res.status(200).json(deletedSales);
};

module.exports = {
  getAll,
  getById,
  addSales,
  editSales,
  deleteSales,
};
