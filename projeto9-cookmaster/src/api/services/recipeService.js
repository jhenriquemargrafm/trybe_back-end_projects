const { ObjectId } = require('bson');
const recipeModel = require('../models/recipeModel');

const addRecipe = async (userId, name, ingredients, preparation) => {
  const data = await recipeModel.addRecipe(name, ingredients, preparation, userId);
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: data.insertedId,
    },
  };
};

const getById = async (id) => {
  const result = await recipeModel.getById(id);
  if (!result) {
    return false;
  }
  return result;
};

const getAll = async () => {
  const result = await recipeModel.getAll();
  return result;
};

const editRecipe = async (id, recipe, userId, role) => {
  const result = await recipeModel.getById(id);
  if (role === 'admin' || result.userId === userId) {
    const data = await recipeModel.editRecipe(id, recipe);
    return { data };
  }
};

const addImageRecipe = async (id, userId, role) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await recipeModel.getById(id);
  const imageLink = `localhost:3000/src/uploads/${id}.jpeg`;

  if (role === 'admin' || result.userId === userId) {
    await recipeModel.addImageRecipe(id, imageLink);
    return {
      _id: id,
      name: result.name,
      ingredients: result.ingredients,
      preparation: result.preparation,
      userId: result.userId,
      image: imageLink,
    };
  }
};

const deleteRecipe = async (id, userId, role) => {
  const result = await recipeModel.getById(id);
  if (role === 'admin' || result.userId === userId) {
    const data = await recipeModel.deleteRecipe(id);
    return { data };
  }
};

module.exports = {
  addRecipe,
  getAll,
  getById,
  editRecipe,
  deleteRecipe,
  addImageRecipe,
};