const router = require('express').Router();

const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation');

// Adição de um usuário ao banco
router.post('/',
  userValidation.checkFields,
  userValidation.checkEmail,
  userController.addUser);

module.exports = router;