const express = require('express');

const { loginValidation } = require('../validations');
const { login } = require('../controllers/loginController');

require('dotenv').config();

const loginRouter = express.Router();

// Requisito 2 - Rota LOGIN - POST
loginRouter.post('/', loginValidation, login);

module.exports = loginRouter;