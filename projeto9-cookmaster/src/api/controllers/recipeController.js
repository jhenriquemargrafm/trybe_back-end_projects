const recipeService = require('../services/recipeService');

// Adicionar uma receita
const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const result = await recipeService.addRecipe(userId, name, ingredients, preparation);
  return res.status(201).json(result);
};

// Listagem de todas as receitas
const getAll = async (_req, res) => {
  const result = await recipeService.getAll();

  return res.status(200).json(result);
};

// Busca de uma receita
const getById = async (req, res) => {
  const result = await recipeService.getById(req.params.id);

  if (result === false) return res.status(404).json({ message: 'recipe not found' });

  res.status(200).json(result);
};

// Edição de uma receita
const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req;
  const recipe = req.body;
  const response = await recipeService.editRecipe(id, recipe, userId, role);
  
  if (!response) return res.status(401).json({ message: 'jwt malformed' });

  res.status(200).json(
    { _id: id, 
      name: recipe.name,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,  
      userId,
    },
  );
};

// Adição de uma imagem a uma receita
const addImageRecipe = async (req, res, _next) => {
  const { id } = req.params;
  const { userId, role } = req;
  const data = await recipeService.addImageRecipe(id, userId, role);
  return res.status(200).json(data);
};

// Exclusão de uma receita
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req;
  const response = await recipeService.deleteRecipe(id, userId, role);
  
  if (!response) return res.status(401).json({ message: 'jwt malformed' });

  res.status(204).json();
};

module.exports = {
  addRecipe,
  getAll,
  getById,
  editRecipe,
  deleteRecipe,
  addImageRecipe,
};