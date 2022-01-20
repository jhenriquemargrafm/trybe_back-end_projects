const productsRouter = require('express').Router();
const productsController = require('../controllers/productsController');

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

productsRouter.post('/', productsController.addProduct);

productsRouter.put('/:id', productsController.editProduct);

productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;