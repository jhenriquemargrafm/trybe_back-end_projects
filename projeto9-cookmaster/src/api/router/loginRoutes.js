const router = require('express').Router();

const loginController = require('../controllers/loginController');
const loginValidation = require('../middlewares/loginValidation');

// Login do usuário e tratamento
router.post('/',
  loginValidation.checkLoginFields,
  loginValidation.checkLoginInfo,
  loginController.checkToken);

module.exports = router;
