const router = require('express').Router();

const multer = require('multer');

const recipeController = require('../controllers/recipeController');
const recipeValidation = require('../middlewares/recipeValidation');
const tokenValidation = require('../middlewares/tokenValidation');

// Postagem de receita
router.post('/',
  recipeValidation.checkRecipeFields,
  tokenValidation.validateToken,
  recipeController.addRecipe);

// Listagem de todas as receitas
router.get('/', recipeController.getAll);

// Busca por um id específico
router.get('/:id', recipeController.getById);

// Edição de uma receita
router.put('/:id', 
  tokenValidation.authToken,
  tokenValidation.validateToken,
  recipeController.editRecipe);

// Adição de uma imagem a uma receita
const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (req, file, callback) => {
    const { id } = req.params;
    return callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

router.put('/:id/image',
  upload.single('image'),
  tokenValidation.authToken,
  tokenValidation.validateToken,
  recipeController.addImageRecipe);

// Exclusão de uma receita
router.delete('/:id', 
  tokenValidation.authToken,
  tokenValidation.validateToken,
  recipeController.deleteRecipe);

module.exports = router;
