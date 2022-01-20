const express = require('express');

const { categoryValidation } = require('../validations');
const { createCategory, listCategories } = require('../controllers/categoryController');

const categoryRouter = express.Router();

// Requisito 5 - Rota Category - POST
categoryRouter.post('/', categoryValidation, createCategory);

// Requisito 6 - Rota Category - GET
categoryRouter.get('/', listCategories);

module.exports = categoryRouter;