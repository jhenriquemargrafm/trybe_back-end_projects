const salesRouter = require('express').Router();
const salesController = require('../controllers/salesController');

salesRouter.get('/', salesController.getAll);

salesRouter.get('/:id', salesController.getById);

salesRouter.post('/', salesController.addSales);

salesRouter.put('/:id', salesController.editSales);

salesRouter.delete('/:id', salesController.deleteSales);

module.exports = salesRouter;